import { appConfig, createApp } from "./app";

const app = createApp();

app.listen(appConfig.port, () => {
  console.log(`GymXP API listening on http://localhost:${appConfig.port}`);
});
