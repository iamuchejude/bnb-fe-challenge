import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInformationSchema, type PersonalInformation } from "./schema";
import { Step } from "~/components/step";
import { Button } from "~/components/button";

type PersonalInformationProps = {
  onNext: (data: PersonalInformation) => void;
  values: Partial<PersonalInformation>;
};

export function PersonalInformation(props: PersonalInformationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PersonalInformation>({
    resolver: zodResolver(PersonalInformationSchema),
    defaultValues: props.values,
    mode: "onChange",
  });

  return (
    <Step title="(1) Personal Information">
      <form
        onSubmit={handleSubmit(props.onNext)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            className="block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            className="mt-1 block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth")}
            className="mt-1 block w-full border-gray-200 border-1 rounded-md focus:border-blue-500 focus:ring-blue-500 h-10 pl-4 pr-4"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
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

export { MAX_AGE } from "./constants";
export { PersonalInformationSchema };
