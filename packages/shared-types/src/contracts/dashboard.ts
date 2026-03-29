export interface DashboardSummaryResponse {
  member: {
    firstName: string;
  };
  activeBranch: {
    id: string;
    name: string;
    city: string;
  };
  xp: number;
  streakDays: number;
  rank: number | null;
  todayInThisGym: {
    activeMembers: number;
    peakWindow: string;
  };
}

