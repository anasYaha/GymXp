import { HttpError } from "../../../core/errors/http-error";
import { dashboardRepository } from "../repository/dashboard.repository";

const branchMockStats: Record<
  string,
  { xp: number; streak: number; rank: number; activeMembers: number; topMuscleGroup: string }
> = {
  branch_tunis: {
    xp: 120,
    streak: 3,
    rank: 7,
    activeMembers: 14,
    topMuscleGroup: "Legs"
  },
  branch_sousse: {
    xp: 95,
    streak: 2,
    rank: 11,
    activeMembers: 9,
    topMuscleGroup: "Back"
  }
};

export class DashboardService {
  async getSummary(userId: string, brandId: string) {
    const user = await dashboardRepository.getUserWithCurrentBranch(userId, brandId);

    if (!user) {
      throw new HttpError(404, "User not found.", "USER_NOT_FOUND");
    }

    if (!user.currentBranchId || !user.currentBranch) {
      throw new HttpError(409, "Select a branch before viewing the dashboard.", "BRANCH_NOT_SELECTED");
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [memberCheckIns, branchCheckInsToday, availableSessions, latestCheckIn] = await Promise.all([
      dashboardRepository.countMemberCheckIns(user.id, user.currentBranchId),
      dashboardRepository.countBranchCheckInsSince(user.currentBranchId, startOfToday),
      dashboardRepository.countAvailableSessionsSince(user.currentBranchId, startOfToday),
      dashboardRepository.getLatestMemberCheckIn(user.id, user.currentBranchId)
    ]);

    const stats = branchMockStats[user.currentBranchId] ?? {
      xp: 80,
      streak: 1,
      rank: 15,
      activeMembers: 6,
      topMuscleGroup: "Full Body"
    };

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      },
      branch: user.currentBranch,
      stats: {
        xp: stats.xp,
        streak: stats.streak,
        rank: stats.rank,
        checkIns: memberCheckIns
      },
      today: {
        activeMembers: stats.activeMembers,
        topMuscleGroup: stats.topMuscleGroup,
        checkInsToday: branchCheckInsToday,
        availableSessions
      },
      sessions: {
        totalCheckIns: memberCheckIns,
        checkedInToday: !!(latestCheckIn && latestCheckIn.checkedInAt >= startOfToday),
        lastCheckInTitle: latestCheckIn?.sessionOption.title ?? null,
        lastCheckInAt: latestCheckIn?.checkedInAt.toISOString() ?? null
      }
    };
  }
}
