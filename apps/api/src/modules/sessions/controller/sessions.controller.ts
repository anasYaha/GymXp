<<<<<<< HEAD
import type { RequestHandler } from "express";

import { sendOk } from "../../../core/http/response";
import { SessionsService } from "../service/sessions.service";

const sessionsService = new SessionsService();

export const sessionsController: Record<"listAvailable" | "listMine" | "checkIn", RequestHandler> = {
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
  }
};
=======
import { notImplemented } from "../../../core/utils/not-implemented";

export const sessionsController = {
  create: () => notImplemented("POST /sessions"),
  listMine: () => notImplemented("GET /sessions/me"),
  complete: () => notImplemented("PATCH /sessions/:id/complete")
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
