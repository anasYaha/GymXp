<<<<<<< HEAD
export const getBranchLeaderboard = async () => {
  return Promise.resolve({
    status: "TODO",
    message: "Connect branch leaderboard endpoint"
  });
=======
import type {
  LeaderboardResponse,
  MyLeaderboardResponse
} from "@gymxp/shared-types/contracts/leaderboard";

import { DEMO_LEADERBOARD, DEMO_MY_LEADERBOARD } from "../../constants/demo";
import { apiClient } from "../../services/api/api-client";

export const getBranchLeaderboard = async (): Promise<LeaderboardResponse> => {
  try {
    return await apiClient.get<LeaderboardResponse>("/leaderboard");
  } catch {
    return DEMO_LEADERBOARD;
  }
};

export const getMyLeaderboardStanding = async (): Promise<MyLeaderboardResponse> => {
  try {
    return await apiClient.get<MyLeaderboardResponse>("/leaderboard/me");
  } catch {
    return DEMO_MY_LEADERBOARD;
  }
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
};

