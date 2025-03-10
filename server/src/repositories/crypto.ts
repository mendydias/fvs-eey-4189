import * as bcrypt from "bcryptjs";
import { User } from "src/models/registration-models";
import jwt from "jsonwebtoken";

export async function preparePassword(plaintext: string, saltRounds: number) {
  return await bcrypt.hash(plaintext, saltRounds);
}

export async function verifyHash(plaintext: string, ciphertext: string) {
  return await bcrypt.compare(plaintext, ciphertext);
}

// WARN: Change the secret key to something else.
const secret_key = "secret";

export async function signToken(user: User, issuer: string, audience: string) {
  const payload = {
    sub: user.email,
    name: user.email,
    role: "admin",
  };
  const token = jwt.sign(payload, secret_key, {
    issuer,
    audience,
    expiresIn: "2h",
  });
  return token;
}
