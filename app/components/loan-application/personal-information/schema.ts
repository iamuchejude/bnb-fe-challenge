import { z } from "zod";
import {
  GERMAN_LATIN_MULTIWORD_RE,
  GERMAN_LATIN_RE,
  MAX_AGE,
} from "./constants";

export const PersonalInformationSchema = z.object({
  firstName: z
    .string()
    .min(1, "Firstname cannot be empty")
    .regex(
      GERMAN_LATIN_RE,
      "Firstname must contain only Latin and German letters"
    )
    .refine((val) => !val.includes(" "), "Only single name allowed"),

  lastName: z
    .string()
    .min(1, "Lastname cannot be empty")
    .regex(
      GERMAN_LATIN_MULTIWORD_RE,
      "Lastname must contain only Latin and German letters"
    ),

  dateOfBirth: z.string().refine((val) => {
    const now = new Date();
    const birth = new Date(val);
    const age = now.getFullYear() - birth.getFullYear();
    return age <= MAX_AGE;
  }, `Max age is ${MAX_AGE} years`),
});

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>;
