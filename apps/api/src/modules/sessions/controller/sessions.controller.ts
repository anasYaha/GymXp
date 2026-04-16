import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response.js";
import { SessionsService } from "../service/sessions.service.js";

const sessionsService = new SessionsService();

export const sessionsController: Record<"listAvailable" | "listMine" | "checkIn" | "completeWorkout", RequestHandler> = {
  async listAvailable(request, response) {
    const result = await sessionsService.listAvailableSessions({
      userId: request.context!.userId,
      branchId: request.context!.branchId
    });

    return sendOk(response, result);
  },

  async listMine(request, response) {
    const result = await sessionsService.listMemberAttendances({
      userId: request.context!.userId,
      branchId: request.context!.branchId
    });

    return sendOk(response, result);
  },

  async checkIn(request, response) {
    const sessionOptionId =
      typeof request.params.id === "string" ? request.params.id : request.params.id?.[0] ?? "";

    const result = await sessionsService.checkInToSession(
      {
        userId: request.context!.userId,
        branchId: request.context!.branchId
      },
      sessionOptionId
    );

    return sendOk(response, result, 201);
  },

  async completeWorkout(request, response) {
    const result = await sessionsService.completeWorkout(
      {
        userId: request.context!.userId,
        branchId: request.context!.branchId
      },
      request.body.muscleGroup
    );

    return sendOk(response, result, 201);
  }
};
