export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  xp: number;
}

export interface LeaderboardResponse {
  branch: {
    id: string;
    name: string;
  };
  items: LeaderboardEntry[];
}

export interface MyLeaderboardResponse {
  rank: number | null;
  xp: number;
  branchId: string;
}

