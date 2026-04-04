<<<<<<< HEAD
import { appConfig, createApp } from "./app";

const app = createApp();

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`GymXP API listening on http://${appConfig.host}:${appConfig.port}`);
});
=======
import { createApp } from "./app";

const app = createApp();

console.log("GymXP API scaffold ready", app);

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
