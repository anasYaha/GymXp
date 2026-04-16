const { appConfig, createApp } = require("./app");

const app = createApp();
const PORT = process.env.PORT || appConfig.port;

const server = app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`GymXP API listening on http://0.0.0.0:${PORT}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `GymXP API could not start because port ${PORT} is already in use. Stop the other process or set a different PORT.`
    );
    process.exit(1);
  }

  console.error("GymXP API failed to start.", error);
  process.exit(1);
});
