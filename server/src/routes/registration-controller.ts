/**
 * @module Registration endpoints for basic crud.
 */
import express, { Router } from "express";
import { DuplicateKeyError } from "../repositories/errors";
import {
  ElectionSchema,
  Role,
  VoterSchema,
  VoterUpdateSchema,
} from "../models/registration-models";
import { FVSConfig } from "../config";
import getUserRepository, {
  type UserRepository,
} from "../repositories/user-repository";
import { verifyToken } from "./auth-util";
import {
  ElectionRepository,
  getElectionRepository,
} from "../repositories/election-repository";

type EndpointSetupRequirements = {
  router: Router;
  repo: UserRepository;
  roles: Role[];
};

type ElectionEndpointSetupRequirements = {
  router: Router;
  userRepo: UserRepository;
  repo: ElectionRepository;
  roles: Role[];
};

export default function getUserRegistrationRouter(config: FVSConfig) {
  const router = express.Router();
  const repo = getUserRepository(config);
  const electionRepo = getElectionRepository(config);

  // voter endpoints
  setupVoterRegistration({ router, repo, roles: ["all"] });
  setupVoterDeletion({ router, repo, roles: ["admin"] });
  setupVoterUpdate({ router, repo, roles: ["admin"] });
  setupVoterFetch({ router, repo, roles: ["admin"] });

  // election endpoints
  setupElectionCreation({
    router,
    repo: electionRepo,
    userRepo: repo,
    roles: ["admin"],
  });

  return router;
}

// /register/voter
function setupVoterRegistration({
  router,
  repo,
  roles,
}: EndpointSetupRequirements) {
  router.post("/voter", async (req, res) => {
    console.log(req.body);
    // Parse the request body to get the voter data.
    let result = VoterSchema.safeParse(req.body);

    // Check if parsing was successful.
    if (result.success) {
      // Save the user details and send a success message back.
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
      console.log(result.error);
      res.status(400).json({
        message:
          "Failed to register voter. Voter request body malformed. Please contact the admin.",
      });
    }
  });
}

function setupVoterDeletion({
  router,
  repo,
  roles,
}: EndpointSetupRequirements) {
  router.delete("/voter/:id", async (req, res) => {
    const voterId = req.params.id;
    const token = req.headers["authorization"]?.split(" ")[1];
    const verification = await verifyToken(repo, roles, token);
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
      } catch (error) {}
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}

function setupVoterUpdate({ router, repo, roles }: EndpointSetupRequirements) {
  router.put("/voter", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const verification = await verifyToken(repo, roles, token);
    if (verification) {
      const voterSubmission = VoterUpdateSchema.safeParse(req.body);
      if (voterSubmission.success) {
        try {
          const result = await repo.updateVoter(voterSubmission.data);
          if (result.ok) {
            res.status(201).json({
              updated: result.updated,
            });
          } else {
            res.status(404).json({
              message: "Voter not found",
            });
          }
        } catch (error) {
          console.error(error);
          res.status(500);
        }
      } else {
        res.status(400).json({
          message: "Unable to update voter, request malformed",
        });
      }
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}

function setupVoterFetch({ router, repo, roles }: EndpointSetupRequirements) {
  router.get("/voters", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const verification = await verifyToken(repo, roles, token);
    if (verification) {
      const voters = await repo.getAllVoters();
      res.status(200).json(voters);
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });

  router.get("/voter/:id", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const verification = await verifyToken(repo, roles, token);
    if (verification) {
      const voter = await repo.findVoter(req.params.id);
      if (voter) {
        res.status(200).json(voter);
      } else {
        res.status(404);
      }
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}

function setupElectionCreation({
  router,
  repo,
  userRepo,
  roles,
}: ElectionEndpointSetupRequirements) {
  router.post("/election", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const verification = await verifyToken(userRepo, roles, token);
    if (verification) {
      const electionSubmission = ElectionSchema.safeParse({
        title: req.body.title,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      });
      if (electionSubmission.success) {
        const title = await repo.createElection(electionSubmission.data);
        if (title) {
          res.status(201).json({
            title: title,
          });
          return;
        }
      } else {
        res.status(400).json({
          message: "Unable to create election, request malformed",
        });
      }
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}
