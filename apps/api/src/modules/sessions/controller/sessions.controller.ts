import { notImplemented } from "../../../core/utils/not-implemented";

export const sessionsController = {
  create: () => notImplemented("POST /sessions"),
  listMine: () => notImplemented("GET /sessions/me"),
  complete: () => notImplemented("PATCH /sessions/:id/complete")
};

