import type { Request, RequestHandler } from "express";
import { ZodError, type AnyZodObject, type ZodSchema } from "zod";

import { HttpError } from "../errors/http-error.js";

interface ValidationSchemas {
  body?: ZodSchema;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

const parseOrThrow = <T>(schema: ZodSchema<T>, input: unknown, source: string): T => {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new HttpError(400, `Invalid ${source}.`, "VALIDATION_ERROR", error.flatten());
    }

    throw error;
  }
};

export const validate =
  ({ body, params, query }: ValidationSchemas): RequestHandler =>
  (request, _response, next) => {
    try {
      if (body) {
        request.body = parseOrThrow(body, request.body, "request body");
      }

      if (params) {
        request.params = parseOrThrow(params, request.params, "route params") as Request["params"];
      }

      if (query) {
        request.query = parseOrThrow(query, request.query, "query params") as Request["query"];
      }

      next();
    } catch (error) {
      next(error);
    }
  };
