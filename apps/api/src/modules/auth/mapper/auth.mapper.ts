<<<<<<< HEAD
import type { AuthUserRecord } from "../repository/auth.repository";

export const mapAuthUser = (input: AuthUserRecord) => ({
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
export const mapAuthUser = (input: unknown) => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
