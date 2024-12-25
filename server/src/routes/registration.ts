import express from "express";
import Voter from "../models/registration";
import repo from "../repositories/registration";
import config from "../bootstrap";

const router = express.Router();
const { logger } = config;

router.post("/voter", async (req, res) => {
  // Parse the request body to get the voter data.
  logger?.debug("Handling voter registration.");

  let result = Voter.safeParse(req.body);

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

      res.status(500).json({
        message: "Unable to save voter details",
        details: {
          errors: e.message,
        },
      });
    }
  } else {
    logger?.debug(
      `Voter registration body validation failed, the following errors manisfested: `,
    );
    logger?.error(result.error.issues);

    res.status(400).json({
      message: "Failed to register voter",
      details: {
        errors: result.error.issues,
      },
    });
  }
});

export default router;
