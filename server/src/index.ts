import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import config from "./bootstrap";
import RegistrationRouter from "./routes/registration";

const app = express();

// default security middleware
app.use(helmet());
// json parser ensures the content-type is set correctly and also that the post bodies are correctly parsed.
app.use(bodyParser.json());

// routers
app.use("/register", RegistrationRouter);

// starts the server and listens on the configured ports.
app.listen(config.network.port, config.network.host, () => {
  if (config.logger) {
    config.logger.info("Starting server...");
    config.logger.debug(
      `Starting server on http://${config.network.host}:${config.network.port}`,
    );
  }
});
