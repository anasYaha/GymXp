<<<<<<< HEAD
import type { SessionAttendanceRecord, SessionOptionRecord } from "../repository/sessions.repository";

export const mapSessionOption = (input: SessionOptionRecord) => ({
  id: input.id,
  branchId: input.branchId,
  title: input.title,
  description: input.description,
  coachName: input.coachName,
  startsAt: input.startsAt.toISOString(),
  durationMins: input.durationMins,
  muscleGroup: input.muscleGroup,
  checkedIn: input.attendances.length > 0,
  createdAt: input.createdAt.toISOString(),
  updatedAt: input.updatedAt.toISOString()
});

export const mapSessionAttendance = (input: SessionAttendanceRecord) => ({
  id: input.id,
  userId: input.userId,
  branchId: input.branchId,
  sessionOptionId: input.sessionOptionId,
  checkedInAt: input.checkedInAt.toISOString(),
  createdAt: input.createdAt.toISOString(),
  sessionOption: {
    id: input.sessionOption.id,
    branchId: input.sessionOption.branchId,
    title: input.sessionOption.title,
    description: input.sessionOption.description,
    coachName: input.sessionOption.coachName,
    startsAt: input.sessionOption.startsAt.toISOString(),
    durationMins: input.sessionOption.durationMins,
    muscleGroup: input.sessionOption.muscleGroup,
    createdAt: input.sessionOption.createdAt.toISOString(),
    updatedAt: input.sessionOption.updatedAt.toISOString()
  }
});
=======
export const mapWorkoutSession = (input: unknown) => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
