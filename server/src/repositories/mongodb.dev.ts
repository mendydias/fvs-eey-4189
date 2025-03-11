import { MongoClient, ServerApiVersion } from "mongodb";
import { DuplicateKeyError } from "./errors";
import loadConfig from "../config";
import { Admin, Role, User, Voter } from "src/models/registration-models";

const { logger, database_uri } = loadConfig();

const client = new MongoClient(database_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("fvs");

const VOTERS = "voters";
const USERS = "users";
const ADMINS = "admins";

async function saveVoter(voter: Voter): Promise<any> {
  logger?.debug(`Saving ${voter.nic}:${voter.fullname} to database.`);
  try {
    let result = await db
      .collection<Voter>(VOTERS)
      .insertOne({ _id: voter.nic, ...voter });
    logger?.debug(result.insertedId);
    return result.insertedId;
  } catch (error: any) {
    logger?.error(error);
    if (error.code === 11000) {
      throw new DuplicateKeyError(voter.nic);
    }
  }
}

async function saveAdmin(user_id: string): Promise<any> {
  logger?.debug(`Saving ${user_id} as admin to database.`);
  const date_registered = new Date();
  try {
    let user = await db.collection<User>(USERS).findOne({ nic: user_id });
    if (user != null) {
      let result = await db.collection<Admin>(ADMINS).insertOne({
        date_registered,
        user: {
          id: user._id,
          email: user.email,
        },
      });
      logger?.debug(result.insertedId);
      return result.insertedId;
    } else {
      return null;
    }
  } catch (error: any) {
    logger?.error(error);
    if (error.code === 11000) {
      throw new DuplicateKeyError(user_id);
    }
  }
}

async function saveUser(
  email: string,
  password: string,
  role: Role,
): Promise<string | null> {
  try {
    logger?.debug(`Saving ${email} to database.`);
    let result = await db.collection<User>(USERS).insertOne({
      _id: email,
      email,
      password,
      role,
    });
    logger?.debug(result.insertedId);
    return result.insertedId;
  } catch (error: any) {
    logger?.error(error);
    if (error.code === 11000) {
      throw new DuplicateKeyError(email);
    }
    return null;
  }
}

async function findUser(user: Partial<User>): Promise<User | null> {
  if (user && user.email) {
    const dbUser = await db.collection<User>(USERS).findOne(user);
    if (dbUser != null) {
      return {
        email: dbUser.email,
        password: dbUser.password,
        role: dbUser.role,
      };
    }
  }
  return null;
}

async function findVoter(voter: Partial<Voter>): Promise<Voter | null> {
  if (voter && voter.nic) {
    const dbVoter = await db.collection<Voter>(VOTERS).findOne(voter);
    if (dbVoter != null) {
      return dbVoter;
    }
  }
  return null;
}

async function deleteUser(user: Partial<User>): Promise<boolean> {
  if (user && user.email) {
    const result = await db.collection<User>(USERS).deleteOne(user);
    return result.deletedCount === 1;
  }
  return false;
}

async function deleteVoter(voter: Partial<Voter>): Promise<boolean> {
  if (voter && voter.nic) {
    const result = await db.collection<Voter>(VOTERS).deleteOne(voter);
    return result.deletedCount === 1;
  }
  return false;
}

export default {
  saveVoter,
  saveAdmin,
  saveUser,
  findUser,
  findVoter,
  deleteUser,
  deleteVoter,
};
