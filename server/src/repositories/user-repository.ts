/**
 * @module Repository abstraction for the data layer.
 */
import { Role, User, Voter, VoterUpdate } from "../models/registration-models";
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
  findVoter: (nic: string) => Promise<VoterUpdate | null>;
  promoteUserToAdmin: (user: User) => Promise<void>;
  verifyUser: (user: Partial<User>) => Promise<boolean>;
  verifyUserWithRole: (user: Partial<User>, roles: Role[]) => Promise<boolean>;
  deleteVoter: (voterId: string) => Promise<DeletionStatus>;
  updateVoter: (voter: VoterUpdate) => Promise<UpdateStatus>;
  getAllVoters: () => Promise<VoterUpdate[]>;
};

type DeletionStatus = {
  ok: boolean;
  deletedId?: string;
};

type UpdateStatus = {
  ok: boolean;
  updated?: VoterUpdate;
};

export function getUserRepository({ environment }: FVSConfig): UserRepository {
  // The save database call is abstracted so that the development version can use mongo
  // and production can use firebase.
  const db = configureDatabase(environment);

  // Voter methods
  async function save(voter: Voter): Promise<string> {
    await saveUser({
      email: voter.email,
      password: voter.password,
      role: "voter",
    });
    return await db.saveVoter(voter);
  }

  async function saveUser(user: User): Promise<string> {
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
    await db.saveAdmin(user_id);
  }

  // This assumes that the user doesn't exist and must be saved first.
  async function promoteUserToAdmin(user: User): Promise<void> {
    const user_id = await saveUser(user);
    await db.saveAdmin(user_id);
  }

  async function verifyUser(user: Partial<User>): Promise<boolean> {
    if (user && user.email && user.password) {
      const dbUser = await db.findUser({ email: user.email });
      if (dbUser == null) {
        return false;
      }
      const outcome = await crypto.verifyHash(user.password, dbUser.password);
      return outcome;
    }
    return false;
  }

  async function verifyUserWithRole(
    user: Partial<User>,
    roles: Role[],
  ): Promise<boolean> {
    if (user && user.email && user.role) {
      const dbUser = await db.findUser({ email: user.email });
      return dbUser !== null && roles.includes(dbUser.role);
    }
    return false;
  }

  async function deleteVoter(voterId: string): Promise<DeletionStatus> {
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
    return await db.findUser(user);
  }

  async function findVoter(nic: string): Promise<VoterUpdate | null> {
    const voter = await db.findVoter({ nic });
    if (voter) {
      return {
        nic: voter.nic,
        fullname: voter.fullname,
        dob: voter.dob,
        email: voter.email,
        gender: voter.gender,
      };
    } else {
      return voter; // the null case
    }
  }

  async function updateVoter(voter: VoterUpdate): Promise<UpdateStatus> {
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

  async function getAllVoters(): Promise<VoterUpdate[]> {
    return await db.findAllVoters();
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
    findVoter,
    updateVoter,
    getAllVoters,
  };
}

export default getUserRepository;
