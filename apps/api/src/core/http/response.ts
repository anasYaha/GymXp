import type { Response } from "express";

export const sendOk = <T>(response: Response, payload: T, statusCode = 200) => {
  return response.status(statusCode).json(payload);
};

export const sendError = (
  response: Response,
  statusCode: number,
  code: string,
  message: string,
  details?: unknown
) => {
  return response.status(statusCode).json({
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {})
    }
  });
};
