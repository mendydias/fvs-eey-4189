import express from "express";
import Voter from "../models/registration";
import { createLogger, format, transports } from "winston";
import config from "../bootstrap";

const { combine, label, json, timestamp } = format;

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: "registration service" }),
    json(),
    timestamp(),
  ),
  transports: [
    new transports.File({
      filename: config.logPaths.errorLogPath,
      level: "error",
    }),
    new transports.File({ filename: config.logPaths.combiLogPath }),
    new transports.Console(),
  ],
});

const router = express.Router();

router.post("/voter", (req, res) => {
  logger.debug("Handling voter registration.");
  let result = Voter.safeParse(req.body);
  logger.debug(`Voter registration body validation result: ${result.success}`);
  if (result.success) {
    res.json(result.data);
  } else {
    logger.debug(
      `Voter registration body validation failed, the following errors manisfested: `,
    );
    logger.error(result.error.issues);
    res.status(400).json(result.error.issues);
  }
});

export default router;
