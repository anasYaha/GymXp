export interface DashboardSummaryResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  branch: {
    id: string;
    name: string;
    city: string;
  };
  stats: {
    xp: number;
    streak: number;
    rank: number;
  };
  today: {
    activeMembers: number;
    topMuscleGroup: string;
  };
}
