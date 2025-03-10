import getUserRepository, {
  UserRepository,
} from "../repositories/user-repository";
import { FVSConfig } from "../config";
import { z } from "zod";
import { Router, Request, Response } from "express";
import winston from "winston";
import { User, UserSchema } from "../models/registration-models";
import * as crypto from "../repositories/crypto";

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export default function getUserLoginRouter(config: FVSConfig) {
  const router = Router();
  const repo = getUserRepository(config);
  const { logger } = config;
  setupLoginEndpoint(router, repo, logger);
  return router;
}

// /login
function setupLoginEndpoint(
  router: Router,
  repo: UserRepository,
  logger?: winston.Logger,
) {
  logger?.debug("Setting up login endpoint.");
  router.post("/login", async (req: Request, res: Response) => {
    const userParseResult = UserSchema.safeParse(req.body);
    if (userParseResult.success) {
      const outcome = await repo.verifyUser(userParseResult.data);
      logger?.debug("User verification outcome: " + outcome);
      if (outcome) {
        const user: User = userParseResult.data;
        res.status(200).json({
          token: await crypto.signToken(user, "fvs.com", "api.fvs.com"),
        });
      } else {
        logger?.error("User verification failed.");
        res.status(401).json({
          message: "Not authenticated",
        });
      }
    } else {
      logger?.error("User parse failed.");
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}
