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
  brandId: string | null;
  currentBranchId: string | null;
  role: UserRole;
  level: number;
  totalXp: number;
  totalSessions: number;
  age: number | null;
  avatarUrl: string | null;
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
