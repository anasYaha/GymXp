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
    checkIns: number;
  };
  today: {
    activeMembers: number;
    topMuscleGroup: string;
    checkInsToday: number;
    availableSessions: number;
  };
  sessions: {
    totalCheckIns: number;
    checkedInToday: boolean;
    lastCheckInTitle: string | null;
    lastCheckInAt: string | null;
  };
}
