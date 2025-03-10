/**
 * @module Application configuration will be loaded from the environment and we will give it some sane defaults if environment variables are not set.
 * @author: Umendya Dias
 */
import { configDotenv } from "dotenv";
import * as winston from "winston";
import { mkdirSync, existsSync } from "fs";
import path from "path";
import configureDatabase from "./repositories/db";

type NetworkConfig = {
  host: string;
  port: number;
};

type LoggingPaths = {
  combiLogPath: string;
  errorLogPath: string;
};

type AdminCredentials = {
  user: string;
  password: string;
};

type Environment = "DEVELOPMENT" | "PRODUCTION" | "TESTING";

type FVSConfig = {
  network: NetworkConfig;
  database_uri: string;
  logPaths: LoggingPaths;
  logger: winston.Logger | undefined;
  environment: Environment;
  adminCredentials: AdminCredentials;
};

type TestFVSConfig = {
  network?: NetworkConfig;
  logPaths?: LoggingPaths;
  logger?: winston.Logger;
  database_uri?: string;
  environment?: Environment;
  adminCredentials?: AdminCredentials;
};

export default function loadConfig(options?: TestFVSConfig): FVSConfig {
  const defaultAdminCredentials = {
    user: "admin@admin.com",
    password: "admin",
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
    database_uri: "",
    environment: "DEVELOPMENT",
    adminCredentials: defaultAdminCredentials,
  };

  // Load all the needed environment variables.
  configDotenv();

  // Configuration defaults
  if (options && options.network) {
    fvsConfig.network = options.network;
  } else {
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
  }

  if (options && options.logPaths) {
    fvsConfig.logPaths = options.logPaths;
    const { combine, json, timestamp } = winston.format;
    const logger = winston.createLogger({
      level: "debug",
      format: combine(json(), timestamp()),
      transports: [
        new winston.transports.File({
          filename: options.logPaths.errorLogPath,
          level: "error",
        }),
        new winston.transports.File({
          filename: options.logPaths.combiLogPath,
        }),
        new winston.transports.Console(),
      ],
    });
    fvsConfig.logger = logger;
  } else {
    if (process.env.FVS_LOG_DIR != undefined) {
      const logDir = process.env.FVS_LOG_DIR;
      if (!existsSync(logDir)) {
        mkdirSync(logDir);
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
        new winston.transports.File({
          filename: fvsConfig.logPaths.combiLogPath,
        }),
        new winston.transports.Console(),
      ],
    });
    fvsConfig.logger = logger;
  }

  if (options && options.environment) {
    fvsConfig.environment = options.environment;
  } else {
    if (process.env.FVS_ENVIRONMENT) {
      fvsConfig.environment =
        (process.env.FVS_ENVIRONMENT as Environment) || "DEVELOPMENT";
    }
  }

  if (options && options.database_uri) {
    fvsConfig.database_uri = options.database_uri;
  } else {
    if (process.env.FVS_DB_URI !== undefined) {
      fvsConfig.database_uri = process.env.FVS_DB_URI;
    } else {
      throw new Error(
        "Cannot start server without specifying database connection url",
      );
    }
  }

  if (options && options.adminCredentials) {
    fvsConfig.adminCredentials = options.adminCredentials;
  } else {
    if (
      process.env.FVS_ADMIN_USER !== undefined &&
      process.env.FVS_ADMIN_PASSWORD !== undefined
    ) {
      fvsConfig.adminCredentials = {
        user: process.env.FVS_ADMIN_USER,
        password: process.env.FVS_ADMIN_PASSWORD,
      };
    }
  }

  return fvsConfig;
}

export async function loadAdminCredentials(config: FVSConfig) {
  const db = configureDatabase(config.environment);
  const user_id = await db.saveUser(
    config.adminCredentials.user,
    config.adminCredentials.password,
  );
  await db.saveAdmin(user_id);
}
