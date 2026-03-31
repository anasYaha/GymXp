import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";

import { sendError } from "../http/response";
import { HttpError } from "../errors/http-error";

export const errorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpError) {
    return sendError(response, error.statusCode, error.code, error.message, error.details);
  }

  if (error instanceof ZodError) {
    return sendError(response, 400, "VALIDATION_ERROR", "Invalid request.", error.flatten());
  }

  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return sendError(response, 401, "UNAUTHORIZED", "Authentication is invalid or expired.");
  }

  console.error(error);

  return sendError(response, 500, "INTERNAL_SERVER_ERROR", "Something went wrong.");
};
