import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FinancialInformationSchema,
  type FinancialInformation,
} from "./schema";
import { Step } from "~/components/step";
import { Button } from "~/components/button";

type FinancialInformationProps = {
  onNext: (data: FinancialInformation) => void;
  values?: Partial<FinancialInformation>;
  onPrevious: () => void;
};

export function FinancialInformation(props: FinancialInformationProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FinancialInformation>({
    resolver: zodResolver(FinancialInformationSchema),
    defaultValues: props.values,
    mode: "onBlur",
  })

  return (
    <Step title="(4) Financial Information">
      <form
        onSubmit={handleSubmit(props.onNext)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="monthlySalary"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Monthly Salary
          </label>
          <input
            type="number"
            id="monthlySalary"
            {...register("monthlySalary", { valueAsNumber: true })}
            className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.monthlySalary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.monthlySalary.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="additionalIncome"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Income
            <input
              type="checkbox"
              className="ml-2"
              {...register("additionalIncomeEnabled")}
            />
          </label>
          {watch("additionalIncomeEnabled") && (
            <>
              <input
                {...register("additionalIncome", { valueAsNumber: true })}
                id="additionalIncome"
                type="number"
                className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
              />
              {errors.additionalIncome && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.additionalIncome.message}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="mortgage"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mortgage
            <input
              type="checkbox"
              className="ml-2"
              {...register("mortgageEnabled")}
            />
          </label>
          {watch("mortgageEnabled") && (
            <>
              <input
                {...register("mortgage", { valueAsNumber: true })}
                id="mortgage"
                type="number"
                className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
              />
              {errors.mortgage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mortgage.message}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="otherCredits"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Other Credits
            <input
              type="checkbox"
              className="ml-2"
              {...register("otherCreditsEnabled")}
            />
          </label>
          {watch("otherCreditsEnabled") && (
            <>
              <input
                {...register("otherCredits", { valueAsNumber: true })}
                type="number"
                id="otherCredits"
                className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
              />
              {errors.otherCredits && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otherCredits.message}
                </p>
              )}
            </>
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
            label="Next"
            variant="primary"
            disabled={isSubmitting || !isValid}
            type="submit"
          />
        </div>
      </form>
    </Step>
  )
}

export { FinancialInformationSchema };
