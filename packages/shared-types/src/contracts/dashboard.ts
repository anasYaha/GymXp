export interface DashboardSummaryResponse {
<<<<<<< HEAD
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  gym: {
=======
  member: {
    firstName: string;
  };
  activeBranch: {
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
    id: string;
    name: string;
    city: string;
  };
<<<<<<< HEAD
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
=======
  xp: number;
  streakDays: number;
  rank: number | null;
  todayInThisGym: {
    activeMembers: number;
    peakWindow: string;
  };
}

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
