<<<<<<< HEAD
import type { BranchRecord } from "../repository/branches.repository";

export const mapBranch = (input: BranchRecord) => ({
  id: input.id,
  brandId: input.brandId,
  name: input.name,
  city: input.city,
  address: input.address,
  createdAt: input.createdAt.toISOString(),
  updatedAt: input.updatedAt.toISOString()
});
=======
export const mapBranch = (input: unknown) => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
