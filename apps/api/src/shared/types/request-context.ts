<<<<<<< HEAD
import type { UserRole } from "@prisma/client";

export interface RequestContext {
  userId: string;
  brandId: string;
  branchId: string | null;
  role: UserRole;
}
=======
export interface RequestContext {
  userId?: string;
  brandId?: string;
  branchId?: string;
  role?: string;
}

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
