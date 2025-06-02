import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoanRequestSchema, type LoanRequest } from "./schema";
import { Step } from "~/components/step";
import { Button } from "~/components/button";

type LoanRequestProps = {
  onNext: (data: LoanRequest) => void;
  values: Partial<LoanRequest>;
  onPrevious: () => void;
};

export function LoanRequest(props: LoanRequestProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoanRequest>({
    resolver: zodResolver(LoanRequestSchema),
    defaultValues: props.values,
    mode: "onChange",
  })

  return (
    <Step title="(3) Loan Request">
      <form
        onSubmit={handleSubmit(props.onNext)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="loanAmount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Loan Amount
          </label>
          <input
            type="number"
            id="loanAmount"
            {...register("loanAmount", { valueAsNumber: true })}
            className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.loanAmount.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="upfrontPayment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upfront Payment
          </label>
          <input
            type="number"
            id="upfrontPayment"
            {...register("upfrontPayment", { valueAsNumber: true })}
            className="mt-1 block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.upfrontPayment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.upfrontPayment.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="terms"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Terms
          </label>
          <input
            id="terms"
            type="number"
            {...register("terms", { valueAsNumber: true })}
            className="mt-1 block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
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
  );
}

export { LoanRequestSchema };
