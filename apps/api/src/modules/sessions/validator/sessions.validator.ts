import { z } from "zod";

export const sessionParamsSchema = z.object({
  id: z.string().trim().min(1)
});
