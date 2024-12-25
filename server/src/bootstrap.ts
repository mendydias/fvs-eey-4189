import { configDotenv } from "dotenv";
import { createLogger, format, Logger, transports } from "winston";
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
  logger: Logger | undefined;
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

// The following console logger will be available throughout the application.
// Only use it to log application wide events.
const { combine, json, timestamp, label } = format;
const logger = createLogger({
  level: process.env.APP_LOG_LEVEL || "info",
  format: combine(label({ label: "Application logger" }), json(), timestamp()),
  transports: [new transports.Console()],
});
fvsConfig.logger = logger;

// Configuration defaults
let port = 8080;
if (process.env.PORT != undefined) {
  port = Number(process.env.PORT);
} else {
  logger.error(`PORT not defined, defaulting to ${port}`);
}

let host = "localhost";
if (process.env.HOST != undefined) {
  host = process.env.HOST;
} else {
  logger.error(`HOST not defined, defaulting to ${host}`);
}
const network = { host, port };
fvsConfig.network = network;

if (process.env.FVS_LOG_DIR != undefined) {
  const logDir = process.env.FVS_LOG_DIR;
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
    logger.debug(`Log directory doesn't exist, creating it at ${logDir}.`);
  }
  if (
    process.env.FVS_COMBI_LOG != undefined &&
    process.env.FVS_ERROR_LOG != undefined
  ) {
    const combiLogPath = path.join(logDir, process.env.FVS_COMBI_LOG);
    const errorLogPath = path.join(logDir, process.env.FVS_ERROR_LOG);
    logger.debug(`Creating combined log at ${combiLogPath}`);
    logger.debug(`Creating error log at ${errorLogPath}`);
    fvsConfig.logPaths = {
      combiLogPath,
      errorLogPath,
    };
  } else {
    logger.error("No log paths defined for both combined and error logs.");
    process.exit(1);
  }
} else {
  logger.error("FVS_LOG_DIR must be set for the application to start.");
  process.exit(1);
}

export default fvsConfig;
