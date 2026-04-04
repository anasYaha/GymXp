<<<<<<< HEAD
import { HttpError } from "../../../core/errors/http-error";
import { mapSessionAttendance, mapSessionOption } from "../mapper/sessions.mapper";
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
}
=======
export class SessionsService {
  createSession(): Promise<never> {
    return Promise.reject(new Error("TODO: implement session creation"));
  }

  listMemberSessions(): Promise<never> {
    return Promise.reject(new Error("TODO: implement session listing"));
  }

  completeSession(): Promise<never> {
    return Promise.reject(new Error("TODO: implement session completion"));
  }
}

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
