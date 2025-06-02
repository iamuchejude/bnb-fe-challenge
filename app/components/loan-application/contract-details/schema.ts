import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";

export const ContractDetailsSchema = z.object({
  email: z.string().email(),
  phone: z.string().refine(validatePhoneNumber, "Invalid phone format"),
});

function validatePhoneNumber(value: string) {
  try {
    const num = parsePhoneNumber(value);
    return num && num.isValid() && num.number === value;
  } catch {
    return false;
  }
}

export type ContractDetails = z.infer<typeof ContractDetailsSchema>;
