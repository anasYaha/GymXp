import cors from "cors";
import express from "express";

import { env } from "./core/config/env.js";
import { errorMiddleware } from "./core/middleware/error-middleware.js";
import { registerRoutes } from "./routes/index.js";

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
