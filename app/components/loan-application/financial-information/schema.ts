import { z } from "zod";

export const FinancialInformationSchema = z.object({
  monthlySalary: z.number(),

  additionalIncomeEnabled: z.boolean().optional(),
  additionalIncome: z.number().optional(),

  mortgageEnabled: z.boolean().optional(),
  mortgage: z.number().optional(),

  otherCreditsEnabled: z.boolean().optional(),
  otherCredits: z.number().optional(),
});

export type FinancialInformation = z.infer<typeof FinancialInformationSchema>;
