import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContractDetailsSchema, type ContractDetails } from "./schema";
import { Step } from "~/components/step";
import { Button } from "~/components/button";

type ContactDetailsProps = {
  onNext: (data: ContractDetails) => void;
  values: Partial<ContractDetails>;
  onPrevious: () => void;
};

export function ContactDetails(props: ContactDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContractDetails>({
    resolver: zodResolver(ContractDetailsSchema),
    defaultValues: props.values,
    mode: "onChange",
  });

  return (
    <Step title="(2) Contract Details">
      <form
        onSubmit={handleSubmit(props.onNext)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            {...register("phone")}
            id="phone"
            className="mt-1 block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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

export { ContractDetailsSchema };
