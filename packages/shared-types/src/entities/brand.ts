import { UserRole, WorkoutStatus } from "../enums/roles";

export interface GymBrand {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GymBranch {
  id: string;
  brandId: string;
  name: string;
  city: string;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
<<<<<<< HEAD
  brandId?: string | null;
  currentBranchId: string | null;
=======
  brandId: string;
  currentBranchId: string;
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  branchId: string;
  muscleGroup: string;
  startedAt: string;
  endedAt?: string | null;
  status: WorkoutStatus;
  createdAt: string;
  updatedAt: string;
}

export interface XPLog {
  id: string;
  userId: string;
  branchId: string;
  amount: number;
  reason: string;
  createdAt: string;
}
<<<<<<< HEAD
=======

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
