import { UserRepository } from "src/repositories/user-repository";
import * as crypto from "../repositories/crypto";
import { Role } from "src/models/registration-models";

export async function verifyToken(
  userRepo: UserRepository,
  roles: Role[],
  token?: string,
): Promise<boolean> {
  if (token) {
    const decoded = await crypto.verifyToken(token);
    if (decoded) {
      return await userRepo.verifyUserWithRole(
        {
          email: decoded.sub,
          role: decoded.role,
        },
        roles,
      );
    }
  }
  return false;
}
