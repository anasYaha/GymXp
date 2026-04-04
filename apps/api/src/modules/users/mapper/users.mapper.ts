<<<<<<< HEAD
import type { UserRecord } from "../repository/users.repository";

export const mapUser = (input: UserRecord) => ({
  id: input.id,
  fullName: input.fullName,
  email: input.email,
  brandId: input.brandId,
  currentBranchId: input.currentBranchId,
  role: input.role,
  createdAt: input.createdAt.toISOString(),
  updatedAt: input.updatedAt.toISOString()
});
=======
export const mapUserProfile = (input: unknown) => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
