import { z } from "zod";

export const branchParamsSchema = z.object({
  id: z.string().trim().min(1)
});
