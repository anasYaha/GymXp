<<<<<<< HEAD
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
=======
import { env } from "./core/config/env";

export const createApp = () => {
  return {
    status: "TODO",
    port: env.port,
    message: "Express app factory placeholder. Register middleware and routes here."
  };
};

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
