import { HttpError } from "../../../core/errors/http-error.js";
import { mapSessionAttendance, mapSessionOption } from "../mapper/sessions.mapper.js";
import { authRepository } from "../../auth/repository/auth.repository.js";
import { sessionsRepository } from "../repository/sessions.repository.js";
import type { SessionsContext } from "../types/sessions.types.js";
import {
  applyWorkoutCompletionProgress,
  getStreakBonus,
  isNextCalendarDay
} from "./progression.js";

const requireActiveBranch = (branchId?: string | null) => {
  if (!branchId) {
    throw new HttpError(409, "Select a branch before viewing sessions.", "BRANCH_NOT_SELECTED");
  }

  return branchId;
};

export class SessionsService {
  async listAvailableSessions(input: SessionsContext) {
    const branchId = requireActiveBranch(input.branchId);
    const items = await sessionsRepository.findAvailableForBranch(branchId, input.userId);

    return {
      items: items.map(mapSessionOption)
    };
  }

  async listMemberAttendances(input: SessionsContext) {
    const branchId = requireActiveBranch(input.branchId);
    const items = await sessionsRepository.findAttendancesForUser(input.userId, branchId);

    return {
      items: items.map(mapSessionAttendance)
    };
  }

  async checkInToSession(input: SessionsContext, sessionOptionId: string) {
    const branchId = requireActiveBranch(input.branchId);
    const option = await sessionsRepository.findOptionByIdForBranch(sessionOptionId, branchId);

    if (!option) {
      throw new HttpError(404, "Session option not found for the active branch.", "SESSION_NOT_FOUND");
    }

    const existingAttendance = await sessionsRepository.findAttendanceByOptionAndUser(
      sessionOptionId,
      input.userId
    );

    if (existingAttendance) {
      throw new HttpError(409, "You are already checked in for this session.", "SESSION_ALREADY_CHECKED_IN");
    }

    const attendance = await sessionsRepository.createAttendance({
      sessionOptionId,
      userId: input.userId,
      branchId
    });

    return {
      attendance: mapSessionAttendance(attendance)
    };
  }

  async completeWorkout(input: SessionsContext, muscleGroup: string) {
    const branchId = requireActiveBranch(input.branchId);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const existingWorkout = await sessionsRepository.findCompletedWorkoutToday(
      input.userId,
      startOfToday
    );

    if (existingWorkout) {
      throw new HttpError(409, "You have already completed this workout today.", "WORKOUT_ALREADY_COMPLETED");
    }

    const user = await authRepository.findUserById(input.userId);
    if (!user) {
      throw new HttpError(404, "User not found.", "USER_NOT_FOUND");
    }

    const previousWorkout = await sessionsRepository.findLatestCompletedWorkoutBeforeDay(input.userId, startOfToday);

    const nextCurrentStreak =
      previousWorkout?.completionDay && isNextCalendarDay(previousWorkout.completionDay, startOfToday)
        ? user.currentStreak + 1
        : 1;

    const streakBonusXp = getStreakBonus(nextCurrentStreak);
    const xpAwarded = 100 + streakBonusXp;

    const progression = applyWorkoutCompletionProgress(
      {
        level: user.level,
        totalXp: user.totalXp,
        totalSessions: user.totalSessions,
        currentStreak: nextCurrentStreak,
        levelXpProgress: user.levelXpProgress,
        levelDaysProgress: user.levelDaysProgress
      },
      xpAwarded
    );

    const updatedUser = await sessionsRepository.completeWorkoutRoutine({
      userId: input.userId,
      branchId,
      muscleGroup,
      completionDay: startOfToday,
      streakBonusXp,
      nextLevel: progression.level,
      nextTotalXp: progression.totalXp,
      nextTotalSessions: progression.totalSessions,
      nextCurrentStreak: nextCurrentStreak,
      nextLevelXpProgress: progression.levelXpProgress,
      nextLevelDaysProgress: progression.levelDaysProgress
    });

    if (!updatedUser) {
      throw new HttpError(409, "You have already completed a workout today.", "WORKOUT_ALREADY_COMPLETED");
    }

    return {
      level: progression.level,
      totalXp: progression.totalXp,
      totalSessions: progression.totalSessions,
      currentStreak: nextCurrentStreak,
      xpAwarded,
      leveledUp: progression.leveledUp,
      progress: progression.progress
    };
  }
}
