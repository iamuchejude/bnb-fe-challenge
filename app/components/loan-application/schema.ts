import { z } from "zod";
import { ContractDetailsSchema } from "./contract-details";
import { FinancialInformationSchema } from "./financial-information";
import { LoanRequestSchema } from "./loan-request";
import { MAX_AGE, PersonalInformationSchema } from "./personal-information";
import { FinalizationSchema } from "./finalization";
import { getValues } from "~/utils";

export const LoanApplicationSchema = z
  .union([
    PersonalInformationSchema,
    ContractDetailsSchema,
    LoanRequestSchema,
    FinancialInformationSchema,
    FinalizationSchema,
  ])
  .superRefine((data, ctx) => {
    if (!isAcceptableProjectedAge(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Age + loan term must be less than 80 years",
        path: ["confirmed"],
      });
    }

    if (hasOverpaidUpfront(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Upfront payment must be less than loan amount",
        path: ["confirmed"],
      });
    }

    if (hasOverpaidUpfront(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Upfront payment must be less than loan amount",
        path: ["confirmed"],
      });
    }

    if (!canAfford(data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "You cannot afford this loan based on your financial information. Please reduce your loan amound in step 3",
      });
    }
  });

export type LoanApplication = z.infer<typeof LoanApplicationSchema>;

function canAfford(data: LoanApplication) {
  const financialInformation = getValues(data, FinancialInformationSchema);
  const loanRequest = getValues(data, LoanRequestSchema);

  const additionalIncome = financialInformation.additionalIncomeEnabled
    ? (financialInformation.additionalIncome ?? 0)
    : 0;
  const mortgage = financialInformation.mortgageEnabled
    ? (financialInformation.mortgage ?? 0)
    : 0;
  const otherCredits = financialInformation.otherCreditsEnabled
    ? (financialInformation.otherCredits ?? 0)
    : 0;

  const affordability =
    (financialInformation.monthlySalary +
      additionalIncome -
      mortgage -
      otherCredits) *
    loanRequest.terms *
    0.5;

  return affordability > loanRequest.loanAmount;
}

function hasOverpaidUpfront(data: LoanApplication) {
  const loanRequest = getValues(data, LoanRequestSchema);
  return loanRequest.upfrontPayment >= loanRequest.loanAmount;
}

function isAcceptableProjectedAge(data: LoanApplication) {
  const loanRequest = getValues(data, LoanRequestSchema);
  const personalInformation = getValues(data, PersonalInformationSchema);
  const dateOfBirth = new Date(personalInformation.dateOfBirth);

  const now = new Date(Date.now());
  const age = now.getFullYear() - dateOfBirth.getFullYear();
  const projectedAge = loanRequest.terms / 12 + age;
  return projectedAge <= MAX_AGE;
}
