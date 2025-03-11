/**
 * @module Repository abstraction for the data layer.
 */
import { User, Voter, VoterUpdate } from "../models/registration-models";
import configureDatabase from "./db";
import * as crypto from "./crypto";
import { FVSConfig } from "../config";

// Describes the operations the database should be able to perform.
export type UserRepository = {
  // Save voter data to the database.
  save: (voter: Voter) => Promise<string>;
  saveUser: (user: User) => Promise<string>;
  saveAdmin: (user_id: string) => Promise<void>;
  findUser: (user: Partial<User>) => Promise<User | null>;
  promoteUserToAdmin: (user: User) => Promise<void>;
  verifyUser: (user: Partial<User>) => Promise<boolean>;
  verifyUserWithRole: (user: Partial<User>) => Promise<boolean>;
  deleteVoter: (voterId: string) => Promise<DeletionStatus>;
  updateVoter: (voter: VoterUpdate) => Promise<UpdateStatus>;
};

type DeletionStatus = {
  ok: boolean;
  deletedId?: string;
};

type UpdateStatus = {
  ok: boolean;
  updated?: VoterUpdate;
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
    await saveUser({
      email: voter.email,
      password: voter.password,
      role: "voter",
    });
    return await db.saveVoter(voter);
  }

  async function saveUser(user: User): Promise<string> {
    logger?.debug(`Saving ${user.email} to database.`);
    const passwordHash = await crypto.preparePassword(user.password, 10);
    const result = await db.saveUser(user.email, passwordHash, user.role);
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

  async function verifyUser(user: Partial<User>): Promise<boolean> {
    logger?.debug(`Verifying ${user.email} in the database.`);
    if (user && user.email && user.password) {
      const dbUser = await db.findUser({ email: user.email });
      logger?.debug(`inside verify user, dbuser: ${JSON.stringify(dbUser)}`);
      if (dbUser == null) {
        return false;
      }
      const outcome = await crypto.verifyHash(user.password, dbUser.password);
      logger?.debug(
        `inside verify user, passed in user: ${JSON.stringify(user)}`,
      );
      logger?.debug(`inside verify user, outcome: ${outcome}`);
      return outcome;
    }
    return false;
  }

  async function verifyUserWithRole(user: Partial<User>): Promise<boolean> {
    if (user && user.email && user.role) {
      const dbUser = await db.findUser({ email: user.email });
      return dbUser !== null && user.role === dbUser.role;
    }
    return false;
  }

  async function deleteVoter(voterId: string): Promise<DeletionStatus> {
    logger?.debug(`Deleting user with id [${voterId}] from the database.`);
    const voter: Voter | null = await db.findVoter({ nic: voterId });
    if (voter) {
      const user: User | null = await db.findUser({ email: voter.email });
      if (user) {
        const deletedId = voter.nic;
        await db.deleteVoter({ email: user.email });
        await db.deleteVoter({ nic: voter.nic });
        return {
          ok: true,
          deletedId,
        };
      }
    }

    return {
      ok: false,
      deletedId: undefined,
    };
  }

  async function findUser(user: Partial<User>): Promise<User | null> {
    logger?.debug(`Finding user with email [${user.email}] in the database.`);
    return await db.findUser(user);
  }

  async function updateVoter(voter: VoterUpdate): Promise<UpdateStatus> {
    logger?.debug(`Updating voter with id [${voter.nic}] in the database.`);
    const exists: Voter | null = await db.findVoter({ nic: voter.nic });
    if (exists) {
      if (exists.email !== voter.email) {
        await db.updateUser({ email: exists.email }, { email: voter.email });
      }
      const modifiedCount = await db.updateVoter({ nic: voter.nic }, voter);
      if (modifiedCount > 0) {
        return {
          ok: true,
          updated: voter,
        };
      }
    }
    return {
      ok: false,
    };
  }

  return {
    save,
    saveUser,
    saveAdmin,
    promoteUserToAdmin,
    verifyUser,
    verifyUserWithRole,
    deleteVoter,
    findUser,
    updateVoter,
  };
}

export default getUserRepository;
