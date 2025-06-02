import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step } from "~/components/step";
import { FinalizationSchema, type Finalization } from "./schema";
import { Button } from "~/components/button";
import { getValues } from "~/utils"
import { type LoanApplication } from "../schema"
import { toCleanEntries, toSentenceCase, toStringValue } from "./utils"

type FinalizationProps = {
  values: Partial<LoanApplication>
  onFinalize: (data: Finalization) => void
  onPrevious?: () => void
}

export function Finalization(props: FinalizationProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Finalization>({
    resolver: zodResolver(FinalizationSchema),
    defaultValues: getValues(props.values, FinalizationSchema),
  })

  return (
    <Step title="(5) Confirm Information">
      <form
        onSubmit={handleSubmit(props.onFinalize)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-3 mb-3">
          {toCleanEntries(props.values).map(([key, value]) => (
            <div key={key}>
              {toSentenceCase(key)} -{" "}
              <span className="font-bold">{toStringValue(value)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="confirmed"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <input
              type="checkbox"
              id="confirmed"
              className="mr-2"
              {...register("confirmed")}
            />
            I confirm that all information provided is accurate and complete.
          </label>
          {errors.confirmed && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmed.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            label="Previous"
            variant="secondary"
            type="button"
            onClick={props.onPrevious}
          />

          <Button
            label="Finalize"
            variant="primary"
            disabled={isSubmitting || !isValid}
            type="submit"
          />
        </div>
      </form>
    </Step>
  )
}

export { FinalizationSchema };
