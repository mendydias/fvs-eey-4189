import { UserRepository } from "src/repositories/user-repository";
import * as crypto from "../repositories/crypto";

export async function verifyToken(
  userRepo: UserRepository,
  token?: string,
): Promise<boolean> {
  if (token) {
    const decoded = await crypto.verifyToken(token);
    if (decoded) {
      return await userRepo.verifyUserWithRole({
        email: decoded.sub,
        role: decoded.role,
      });
    }
  }
  return false;
}
