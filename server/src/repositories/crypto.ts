import * as bcrypt from "bcryptjs";
import { Role, User } from "src/models/registration-models";
import jwt from "jsonwebtoken";

export async function preparePassword(plaintext: string, saltRounds: number) {
  return await bcrypt.hash(plaintext, saltRounds);
}

export async function verifyHash(plaintext: string, ciphertext: string) {
  return await bcrypt.compare(plaintext, ciphertext);
}

// WARN: Change the secret key to something else.
const secret_key = "secret";

export type TokenPayload = {
  sub: string;
  name: string;
  role: Role;
};

export async function signToken(user: User, issuer: string, audience: string) {
  const payload: TokenPayload = {
    sub: user.email,
    name: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, secret_key, {
    issuer,
    audience,
    expiresIn: "2h",
  });
  return token;
}

export async function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, secret_key) as TokenPayload;
    return {
      sub: payload.sub,
      name: payload.name,
      role: payload.role,
    };
  } catch (error) {
    console.error(error);
  }
}
