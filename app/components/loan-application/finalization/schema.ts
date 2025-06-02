import { z } from "zod";

export const FinalizationSchema = z.object({
  confirmed: z.literal(true, {
    errorMap: () => ({ message: "You must confirm the information" }),
  }),
});

export type Finalization = z.infer<typeof FinalizationSchema>;
