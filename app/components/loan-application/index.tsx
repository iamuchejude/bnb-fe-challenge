import { useNavigate, useSearchParams } from "react-router"
import { useCallback, useEffect, useState } from "react"
import { z } from "zod"
import {
  PersonalInformation,
  PersonalInformationSchema,
} from "./personal-information"
import {
  FinancialInformation,
  FinancialInformationSchema,
} from "./financial-information"
import { getValues as $getValues, notify } from "~/utils"
import { createOrUpdateApplication } from "~/data"
import { ContactDetails, ContractDetailsSchema } from "./contract-details"
import { LoanRequest, LoanRequestSchema } from "./loan-request"
import { Steps, useSteps } from "../../hooks/use-steps"
import { type LoanApplication } from "./schema"
import { Finalization } from "./finalization"

type LoanApplicationProps = {
  values?: Partial<LoanApplication>
}

export function LoanApplication(props: LoanApplicationProps) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [values, setValues] = useState<Partial<LoanApplication>>(
    props.values || {}
  )
  const { isCurrent, onNext, onPrevious } = useSteps(Steps.PersonalInformation)

  useEffect(() => {
    setValues((currentValues) => ({
      ...currentValues,
      ...props.values,
    }))
  }, [props.values])

  const handleOnFinalize = useCallback(
    (data: Partial<LoanApplication>) => {
      const id = searchParams.get("id")
      const updatedValues = { ...values, ...data }
      createOrUpdateApplication(updatedValues, id)
        .then(() => {
          notify(
            "success",
            "We've received your application! We'll now review and get back to you"
          )
          setValues({})
          navigate("/")
        })
        .catch(() => {
          notify(
            "error",
            "Failed to finalize application. Please try again later"
          )
        })
    },
    [values, searchParams]
  )

  const handleOnNext = useCallback(
    (data: Partial<LoanApplication>) => {
      const id = searchParams.get("id")
      const updatedValues = { ...values, ...data }
      createOrUpdateApplication(updatedValues, id)
        .then(({ uuid }) => {
          setValues(updatedValues)
          notify("success", "Submitted successfully")
          onNext((step) => {
            setSearchParams({ id: uuid, step })
          })
        })
        .catch(() => {
          notify("error", "Failed to submit. Please try again later")
        })
    },
    [searchParams, onNext, values]
  )

  const getValues = useCallback(
    (schema: z.Schema) => $getValues(values, schema),
    [values]
  )

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-center">Loan Application</h1>

      {isCurrent(Steps.PersonalInformation) && (
        <PersonalInformation
          onNext={handleOnNext}
          values={getValues(PersonalInformationSchema)}
        />
      )}
      {isCurrent(Steps.ContactDetails) && (
        <ContactDetails
          onNext={handleOnNext}
          onPrevious={onPrevious}
          values={getValues(ContractDetailsSchema)}
        />
      )}
      {isCurrent(Steps.LoanRequest) && (
        <LoanRequest
          onNext={handleOnNext}
          onPrevious={onPrevious}
          values={getValues(LoanRequestSchema)}
        />
      )}
      {isCurrent(Steps.FinancialInformation) && (
        <FinancialInformation
          onNext={handleOnNext}
          onPrevious={onPrevious}
          values={getValues(FinancialInformationSchema)}
        />
      )}
      {isCurrent(Steps.Finalization) && (
        <Finalization
          values={values}
          onPrevious={onPrevious}
          onFinalize={handleOnFinalize}
        />
      )}
    </div>
  )
}

export { LoanApplicationSchema } from "./schema"
