import type { BranchRecord } from "../repository/branches.repository.js";

export const mapBranch = (input: BranchRecord) => ({
  id: input.id,
  brandId: input.brandId,
  name: input.name,
  city: input.city,
  address: input.address,
  createdAt: input.createdAt.toISOString(),
  updatedAt: input.updatedAt.toISOString()
});
