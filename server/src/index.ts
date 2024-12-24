import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import express from "express";
import helmet from "helmet";
import RegistrationRouter from "./routes/registration";
import { mkdirSync, existsSync } from "fs";
import { createLogger, format, transports } from "winston";

const { combine, json, timestamp, label } = format;

configDotenv();

const app = express();

const logger = createLogger({
  level: process.env.APP_LOG_LEVEL || "info",
  format: combine(label({ label: "Application logger" }), json(), timestamp()),
  transports: [new transports.Console()],
});

let port = 8080;
if (process.env.PORT != undefined) {
  port = Number(process.env.PORT);
}

let host = "localhost";
if (process.env.HOST != undefined) {
  host = process.env.HOST;
}

if (process.env.FVS_LOG_DIR != undefined) {
  if (!existsSync(process.env.FVS_LOG_DIR)) {
    mkdirSync(process.env.FVS_LOG_DIR);
  }
} else {
  logger.error("FVS_LOG_DIR must be set for the application to start.");
  process.exit(1);
}

app.use(helmet());
app.use(bodyParser.json());

// routers
app.use("/register", RegistrationRouter);

app.listen(port, host, () => {
  console.log("Successfully launched rest server on port: ", port);
});
