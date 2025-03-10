/**
 * @module Repository abstraction for the data layer.
 */
import { User, Voter } from "../models/registration-models";
import configureDatabase from "./db";
import * as crypto from "./crypto";
import { FVSConfig } from "../config";

// Describes the operations the database should be able to perform.
export type UserRepository = {
  // Save voter data to the database.
  save: (voter: Voter) => Promise<string>;
  saveUser: (user: User) => Promise<string>;
  saveAdmin: (user_id: string) => Promise<void>;
  promoteUserToAdmin: (user: User) => Promise<void>;
  verifyUser: (user: User) => Promise<boolean>;
};

export function getUserRepository({
  logger,
  environment,
}: FVSConfig): UserRepository {
  // The save database call is abstracted so that the development version can use mongo
  // and production can use firebase.
  const db = configureDatabase(environment);

  // Voter methods
  async function save(voter: Voter): Promise<string> {
    logger?.debug(`Saving ${voter.nic}:${voter.fullname} to database.`);
    return db.saveVoter(voter);
  }

  async function saveUser(user: User): Promise<string> {
    logger?.debug(`Saving ${user.email} to database.`);
    const passwordHash = await crypto.preparePassword(user.password, 10);
    const result = await db.saveUser(user.email, passwordHash);
    if (result == null) {
      // user is duplicated so we return the existing user id
      return user.email;
    } else {
      return result;
    }
  }

  async function saveAdmin(user_id: string): Promise<void> {
    logger?.debug(`Saving ${user_id} as admin to database.`);
    await db.saveAdmin(user_id);
  }

  // This assumes that the user doesn't exist and must be saved first.
  async function promoteUserToAdmin(user: User): Promise<void> {
    logger?.debug(`Promoting ${user.email} to admin.`);
    const user_id = await saveUser(user);
    await db.saveAdmin(user_id);
  }

  async function verifyUser(user: User): Promise<boolean> {
    logger?.debug(`Verifying ${user.email} in the database.`);
    const dbUser = await db.findUser({ email: user.email });
    if (dbUser == null) {
      return false;
    }
    const outcome = await crypto.verifyHash(user.password, dbUser.password);
    return outcome;
  }

  return {
    save,
    saveUser,
    saveAdmin,
    promoteUserToAdmin,
    verifyUser,
  };
}

export default getUserRepository;
