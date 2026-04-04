import type { UserRole } from "@prisma/client";

export interface AuthTokenPayload {
  userId: string;
  brandId: string;
  branchId: string | null;
  role: UserRole;
}
