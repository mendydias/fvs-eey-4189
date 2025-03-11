/**
 * @module Registration endpoints for basic crud.
 */
import express, { Router } from "express";
import { DuplicateKeyError } from "../repositories/errors";
import { VoterSchema } from "../models/registration-models";
import { FVSConfig } from "../config";
import getUserRepository, {
  type UserRepository,
} from "../repositories/user-repository";
import winston from "winston";
import * as crypto from "../repositories/crypto";

export default function getUserRegistrationRouter(config: FVSConfig) {
  const { logger } = config;
  const router = express.Router();
  const repo = getUserRepository(config);

  // registration endpoints
  setupVoterRegistration(router, repo, logger);
  setupVoterDeletion(router, repo, logger);

  return router;
}

// /register/voter
function setupVoterRegistration(
  router: Router,
  repo: UserRepository,
  logger?: winston.Logger,
) {
  router.post("/voter", async (req, res) => {
    // Parse the request body to get the voter data.
    logger?.debug("Handling voter registration.");

    let result = VoterSchema.safeParse(req.body);

    logger?.debug(
      `Voter registration body validation result: ${result.success}.`,
    );

    // Check if parsing was successful.
    if (result.success) {
      // Save the user details and send a success message back.
      logger?.debug("Calling repository to save the voter.");

      try {
        let nic = await repo.save(result.data);
        res.status(201).json({
          message: "Voter saved.",
          details: {
            nic: nic,
          },
        });
      } catch (e: any) {
        // This is thrown by the repo if there is an error with the underlying database trying to save data.
        logger?.error("Sending error response back.");
        logger?.error(`Error message: ${e.message}`);

        if (e instanceof DuplicateKeyError) {
          res.status(409).json({
            message: "Already registered. Please login!",
          });
        } else {
          res.status(500).json({
            message:
              "Unable to save voter details. Please contact admin and check logs.",
          });
        }
      }
    } else {
      logger?.debug(
        `Voter registration body validation failed, the following errors manisfested: `,
      );
      logger?.error(result.error.issues);

      res.status(400).json({
        message:
          "Failed to register voter. Voter request body malformed. Please contact the admin.",
      });
    }
  });
}

function setupVoterDeletion(
  router: Router,
  repo: UserRepository,
  logger?: winston.Logger,
) {
  router.delete("/voter/:id", async (req, res) => {
    logger?.debug("Handling voter deletion.");
    const voterId = req.params.id;
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
      const decoded = await crypto.verifyToken(token);
      if (decoded) {
        const verification = await repo.verifyUserWithRole({
          email: decoded.sub,
          role: decoded.role,
        });
        if (verification) {
          try {
            const result = await repo.deleteVoter(voterId);
            if (result.ok) {
              res.status(200).json({
                deletedId: voterId,
              });
            } else {
              res.status(404).json({
                deletedId: voterId,
                status: "not found",
              });
            }
          } catch (error) {
            logger?.error(
              `Error deleting voter with id [${req.params.id}]: ${error}`,
            );
          }
        }
      }
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}
