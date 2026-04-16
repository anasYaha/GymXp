import { HttpError } from "../../../core/errors/http-error.js";
import { dashboardRepository } from "../repository/dashboard.repository.js";
import { getProgressSnapshot } from "../../sessions/service/progression.js";

export class DashboardService {
  async getSummary(userId: string, brandId: string, dayType?: string) {
    const user = await dashboardRepository.getUserWithCurrentBranch(userId, brandId);

    if (!user) {
      throw new HttpError(404, "User not found.", "USER_NOT_FOUND");
    }

    if (!user.currentBranchId || !user.currentBranch) {
      throw new HttpError(409, "Select a branch before viewing the dashboard.", "BRANCH_NOT_SELECTED");
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [sameDayUsers, branchCheckInsToday, availableSessions, latestCheckIn, activeMembers, featuredSession] = await Promise.all([
      dayType ? dashboardRepository.countSameDayUsers(user.currentBranchId, dayType, startOfToday) : Promise.resolve(0),
      dashboardRepository.countBranchCheckInsSince(user.currentBranchId, startOfToday),
      dashboardRepository.countAvailableSessionsSince(user.currentBranchId, startOfToday),
      dashboardRepository.getLatestMemberCheckIn(user.id, user.currentBranchId),
      dashboardRepository.countActiveMembers(user.currentBranchId),
      dashboardRepository.getFeaturedSessionTitle(user.currentBranchId, startOfToday)
    ]);

    const progress = getProgressSnapshot(user.level, user.levelXpProgress, user.levelDaysProgress);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        level: user.level,
        totalXp: user.totalXp,
        totalSessions: user.totalSessions,
        currentStreak: user.currentStreak,
        levelXpProgress: user.levelXpProgress,
        levelDaysProgress: user.levelDaysProgress
      },
      gym: user.currentBranch,
      stats: {
        xp: user.totalXp,
        streak: user.currentStreak,
        checkIns: user.totalSessions
      },
      progress,
      today: {
        activeMembers,
        featuredSessionTitle: featuredSession?.title ?? null,
        checkInsToday: branchCheckInsToday,
        availableSessions,
        sameDayUsers
      },
      sessions: {
        totalCheckIns: user.totalSessions,
        checkedInToday: !!(latestCheckIn && latestCheckIn.checkedInAt >= startOfToday),
        lastCheckInTitle: latestCheckIn?.sessionOption.title ?? null,
        lastCheckInAt: latestCheckIn?.checkedInAt.toISOString() ?? null
      }
    };
  }
}
