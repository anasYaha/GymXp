import { appConfig, createApp } from "./app";

const app = createApp();

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`GymXP API listening on http://${appConfig.host}:${appConfig.port}`);
});