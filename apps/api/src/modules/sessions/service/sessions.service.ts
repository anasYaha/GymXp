import { HttpError } from "../../../core/errors/http-error";
import { mapSessionAttendance, mapSessionOption } from "../mapper/sessions.mapper";
import { authRepository } from "../../auth/repository/auth.repository";
import { sessionsRepository } from "../repository/sessions.repository";
import type { SessionsContext } from "../types/sessions.types";

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
      branchId,
      muscleGroup,
      startOfToday
    );

    if (existingWorkout) {
      throw new HttpError(409, "You have already completed this workout today.", "WORKOUT_ALREADY_COMPLETED");
    }

    const user = await authRepository.findUserById(input.userId);
    if (!user) {
      throw new HttpError(404, "User not found.", "USER_NOT_FOUND");
    }

    const newTotalXp = user.totalXp + 100;
    const newTotalSessions = user.totalSessions + 1;
    const newLevel = Math.floor(newTotalXp / 100) + 1;

    await sessionsRepository.completeWorkoutRoutine(
      input.userId,
      branchId,
      muscleGroup,
      newTotalXp,
      newTotalSessions,
      newLevel
    );

    return {
      level: newLevel,
      totalXp: newTotalXp,
      totalSessions: newTotalSessions
    };
  }
}
