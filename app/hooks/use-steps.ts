import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { appendTo } from "~/utils";

export const Steps = {
  PersonalInformation: "PersonalInformation",
  ContactDetils: "ContactDetils",
  LoanRequest: "LoanRequest",
  FinancialInformation: "FinancialInformation",
  Finalization: "Finalization",
} as const;

const StepsToNextStep = {
  PersonalInformation: "ContactDetils",
  ContactDetils: "LoanRequest",
  LoanRequest: "FinancialInformation",
  FinancialInformation: "Finalization",
} as Record<Step, Step>;

const StepsToPreviousStep = {
  ContactDetils: "PersonalInformation",
  LoanRequest: "ContactDetils",
  FinancialInformation: "LoanRequest",
  Finalization: "FinancialInformation",
} as Record<Step, Step>;

type Step = (typeof Steps)[keyof typeof Steps];

export function useSteps(start = Steps.PersonalInformation) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = useMemo(() => {
    const step = searchParams.get("step");
    if (!step || !(step in Steps)) return start;
    return step as Step;
  }, [searchParams]);

  const onNext = useCallback(() => {
    const nextStep = StepsToNextStep[currentStep];
    if (nextStep) {
      setSearchParams(
        appendTo(searchParams, {
          step: nextStep,
        }),
      );
    }
  }, [currentStep, searchParams]);

  const onPrevious = useCallback(() => {
    const previousStep = StepsToPreviousStep[currentStep];
    if (previousStep) {
      setSearchParams(
        appendTo(searchParams, {
          step: previousStep,
        }),
      );
    }
  }, [currentStep, searchParams]);

  const isCurrent = useCallback(
    (step: Step) => currentStep === step,
    [currentStep],
  );

  return { isCurrent, onNext, onPrevious };
}
