export interface DashboardSummaryResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  gym: {
    id: string;
    name: string;
    city: string;
  };
  stats: {
    xp: number;
    streak: number;
    checkIns: number;
  };
  today: {
    activeMembers: number;
    featuredSessionTitle: string | null;
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
