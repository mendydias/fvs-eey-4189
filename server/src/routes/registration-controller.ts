/**
 * @module Registration endpoints for basic crud.
 */
import express from "express";
import repo from "../repositories/user-repository";
import loadConfig from "../config";
import { DuplicateKeyError } from "../repositories/errors";
import { VoterSchema } from "src/models/registration-models";

const router = express.Router();
const { logger } = loadConfig();

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
        res.status(401).json({
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

export default router;
