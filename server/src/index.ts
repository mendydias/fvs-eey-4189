import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import getUserRegistrationRouter from "./routes/registration-controller";
import loadConfig, { Environment, loadAdminCredentials } from "./config";
import getUserLoginRouter from "./routes/login-controller";

export default function getApplication(environment?: Environment) {
  const app = express();

  // default security middleware
  app.use(helmet());
  // json parser ensures the content-type is set correctly and also that the post bodies are correctly parsed.
  app.use(bodyParser.json());

  // routers
  const config =
    environment === undefined ? loadConfig() : loadConfig({ environment });
  loadAdminCredentials(config);
  const RegistrationRouter = getUserRegistrationRouter(config);
  app.use("/register", RegistrationRouter);
  app.use("/auth", getUserLoginRouter(config));

  return {
    config,
    app,
  };
}
