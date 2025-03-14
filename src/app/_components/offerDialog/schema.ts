import { z } from "zod";

export const offerSchema = z.object({
  term: z.number().min(1),
  amount: z.number().min(0),
  interest: z.number().min(0),
});
