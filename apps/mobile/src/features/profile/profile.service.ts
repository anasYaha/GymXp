import type { GymBranch, User } from "@gymxp/shared-types/entities/brand";

import { apiClient } from "../../services/api/api-client";

export interface ProfileResponse {
  user: User;
  branch: Pick<GymBranch, "id" | "name" | "city"> | null;
  stats: {
    level: number;
    totalXp: number;
    totalSessions: number;
    currentStreak: number;
  };
  progress: {
    currentLevel: number;
    nextLevel: number;
    xpInLevel: number;
    xpRequiredForNextLevel: number;
    completedDaysInLevel: number;
    completedDaysRequiredForNextLevel: number;
    remainingXp: number;
    remainingCompletedDays: number;
  };
}

export const getProfile = async () => {
  return apiClient.get<ProfileResponse>("/users/profile");
};
