<<<<<<< HEAD
import { z } from "zod";

export const branchParamsSchema = z.object({
  id: z.string().trim().min(1)
});
=======
import type { BranchParamsDto } from "../dto/branches.dto";

export const validateBranchParams = (input: BranchParamsDto): BranchParamsDto => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
