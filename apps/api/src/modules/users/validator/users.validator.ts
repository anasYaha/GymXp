import { z } from "zod";

export const selectBranchSchema = z.object({
  branchId: z.string().trim().min(1)
});
