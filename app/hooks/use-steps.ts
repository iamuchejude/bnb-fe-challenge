import { useCallback, useState } from "react";

export const Steps = {
  PersonalInformation: "PersonalInformation",
  ContactDetails: "ContactDetails",
  LoanRequest: "LoanRequest",
  FinancialInformation: "FinancialInformation",
  Finalization: "Finalization",
} as const;

const StepsToNextStepMap = {
  PersonalInformation: "ContactDetails",
  ContactDetails: "LoanRequest",
  LoanRequest: "FinancialInformation",
  FinancialInformation: "Finalization",
} as Record<Step, Step>;

const StepsToPreviousStepMap = {
  ContactDetails: "PersonalInformation",
  LoanRequest: "ContactDetails",
  FinancialInformation: "LoanRequest",
  Finalization: "FinancialInformation",
} as Record<Step, Step>;

type Step = (typeof Steps)[keyof typeof Steps];
type HandleUpdateStepFn = (step: Step) => void;

export function useSteps(start = Steps.PersonalInformation) {
  const [currentStep, setCurrentStep] = useState<Step>(start);

  const onNext = useCallback(
    (onUpdate?: HandleUpdateStepFn) => {
      const nextStep = StepsToNextStepMap[currentStep];
      if (nextStep) {
        setCurrentStep(nextStep);
        onUpdate?.(nextStep);
      }
    },
    [currentStep]
  );

  const onPrevious = useCallback(
    (onUpdate?: HandleUpdateStepFn) => {
      const previousStep = StepsToPreviousStepMap[currentStep];
      if (previousStep) {
        setCurrentStep(previousStep);
        onUpdate?.(previousStep);
      }
    },
    [currentStep]
  );

  const isCurrent = useCallback(
    (step: Step) => currentStep === step,
    [currentStep]
  );

  return { isCurrent, onNext, onPrevious };
}
