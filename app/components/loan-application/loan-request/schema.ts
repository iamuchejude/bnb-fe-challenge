import { z } from "zod";
import {
  MAX_LOAN_AMOUNT,
  MIN_LOAN_AMOUNT,
  MAX_TERM,
  MIN_TERM,
} from "./constants";

export const LoanRequestSchema = z.object({
  loanAmount: z.number().min(MAX_LOAN_AMOUNT).max(MIN_LOAN_AMOUNT),
  upfrontPayment: z.number(),
  terms: z.number().min(MIN_TERM).max(MAX_TERM),
});

export type LoanRequest = z.infer<typeof LoanRequestSchema>;
