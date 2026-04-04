import cors from "cors";
import express from "express";

import { env } from "./core/config/env";
import { errorMiddleware } from "./core/middleware/error-middleware";
import { registerRoutes } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: false
    })
  );
  app.use(express.json());
  app.use(registerRoutes());
  app.use(errorMiddleware);

  return app;
};

export const appConfig = {
  host: env.host,
  port: env.port
};