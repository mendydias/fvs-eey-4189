/**
 * @module Application configuration will be loaded from the environment and we will give it some sane defaults if environment variables are not set.
 * @author: Umendya Dias
 */
import { configDotenv } from "dotenv";
import * as winston from "winston";
import { mkdirSync, existsSync } from "fs";
import path from "path";

type NetworkConfig = {
  host: string;
  port: number;
};

type LoggingPaths = {
  combiLogPath: string;
  errorLogPath: string;
};

type FVSConfig = {
  network: NetworkConfig;
  logPaths: LoggingPaths;
  logger: winston.Logger | undefined;
};

let fvsConfig: FVSConfig = {
  network: {
    host: "",
    port: 0,
  },
  logPaths: {
    combiLogPath: "",
    errorLogPath: "",
  },
  logger: undefined,
};

// Load all the needed environment variables.
configDotenv();

// Configuration defaults
let port = 8080;
if (process.env.PORT != undefined) {
  port = Number(process.env.PORT);
} else {
  winston.error(`PORT not defined, defaulting to ${port}`);
}

let host = "localhost";
if (process.env.HOST != undefined) {
  host = process.env.HOST;
} else {
  winston.error(`HOST not defined, defaulting to ${host}`);
}
const network = { host, port };
fvsConfig.network = network;

if (process.env.FVS_LOG_DIR != undefined) {
  const logDir = process.env.FVS_LOG_DIR;
  if (!existsSync(logDir)) {
    mkdirSync(logDir);

    winston.debug(`Log directory doesn't exist, creating it at ${logDir}.`);
  }
  if (
    process.env.FVS_COMBI_LOG != undefined &&
    process.env.FVS_ERROR_LOG != undefined
  ) {
    const combiLogPath = path.join(
      __dirname,
      logDir,
      process.env.FVS_COMBI_LOG,
    );
    const errorLogPath = path.join(
      __dirname,
      logDir,
      process.env.FVS_ERROR_LOG,
    );

    winston.debug(`Creating combined log at ${combiLogPath}`);
    winston.debug(`Creating error log at ${errorLogPath}`);

    fvsConfig.logPaths = {
      combiLogPath,
      errorLogPath,
    };
  } else {
    winston.error("No log paths defined for both combined and error logs.");

    process.exit(1);
  }
} else {
  winston.error("FVS_LOG_DIR must be set for the application to start.");

  process.exit(1);
}

const { combine, json, timestamp } = winston.format;
const logger = winston.createLogger({
  level: "debug",
  format: combine(json(), timestamp()),
  transports: [
    new winston.transports.File({
      filename: fvsConfig.logPaths.errorLogPath,
      level: "error",
    }),
    new winston.transports.File({ filename: fvsConfig.logPaths.combiLogPath }),
    new winston.transports.Console(),
  ],
});
fvsConfig.logger = logger;

export default fvsConfig;
