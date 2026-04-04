<<<<<<< HEAD
import { z } from "zod";

export const selectBranchSchema = z.object({
  branchId: z.string().trim().min(1)
});
=======
import type { SelectBranchDto } from "../dto/users.dto";

export const validateSelectBranchDto = (input: SelectBranchDto): SelectBranchDto => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
