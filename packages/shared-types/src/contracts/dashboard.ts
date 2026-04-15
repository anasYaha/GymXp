export interface DashboardSummaryResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    level: number;
    totalXp: number;
    totalSessions: number;
    currentStreak: number;
    levelXpProgress: number;
    levelDaysProgress: number;
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
  today: {
    activeMembers: number;
    featuredSessionTitle: string | null;
    checkInsToday: number;
    availableSessions: number;
    sameDayUsers?: number;
  };
  sessions: {
    totalCheckIns: number;
    checkedInToday: boolean;
    lastCheckInTitle: string | null;
    lastCheckInAt: string | null;
  };
}
