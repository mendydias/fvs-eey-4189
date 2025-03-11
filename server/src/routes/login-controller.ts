import getUserRepository, {
  UserRepository,
} from "../repositories/user-repository";
import { FVSConfig } from "../config";
import { z } from "zod";
import { Router, Request, Response } from "express";
import { UserSchema } from "../models/registration-models";
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
  setupLoginEndpoint(router, repo);
  return router;
}

// /login
function setupLoginEndpoint(router: Router, repo: UserRepository) {
  router.post("/login", async (req: Request, res: Response) => {
    const userParseResult = UserSchema.safeParse(req.body);
    if (userParseResult.success) {
      const outcome = await repo.verifyUser(userParseResult.data);
      if (outcome) {
        const submittedUser = userParseResult.data;
        const user = await repo.findUser({ email: submittedUser.email });
        if (user != null) {
          res.status(200).json({
            token: await crypto.signToken(user, "fvs.com", "api.fvs.com"),
          });
        }
      } else {
        res.status(401).json({
          message: "Not authenticated",
        });
      }
    } else {
      res.status(401).json({
        message: "Not authenticated",
      });
    }
  });
}
