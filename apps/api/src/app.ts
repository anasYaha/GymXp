import { env } from "./core/config/env";

export const createApp = () => {
  return {
    status: "TODO",
    port: env.port,
    message: "Express app factory placeholder. Register middleware and routes here."
  };
};

