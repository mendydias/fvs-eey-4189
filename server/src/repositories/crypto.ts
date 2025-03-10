import * as bcrypt from "bcryptjs";

export async function preparePassword(plaintext: string, saltRounds: number) {
  return await bcrypt.hash(plaintext, saltRounds);
}

export async function verifyHash(plaintext: string, ciphertext: string) {
  return await bcrypt.compare(plaintext, ciphertext);
}
