import { MongoClient, ServerApiVersion } from "mongodb";
import { DuplicateKeyError } from "./errors";
import loadConfig from "../config";
import {
  Admin,
  Election,
  Role,
  User,
  Voter,
  VoterUpdate,
} from "src/models/registration-models";

const { database_uri } = loadConfig();

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
const ELECTIONS = "elections";

async function saveVoter(voter: Voter): Promise<any> {
  try {
    let result = await db
      .collection<Voter>(VOTERS)
      .insertOne({ _id: voter.nic, ...voter });
    return result.insertedId;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicateKeyError(voter.nic);
    }
  }
}

async function saveAdmin(user_id: string): Promise<any> {
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
      return result.insertedId;
    } else {
      return null;
    }
  } catch (error: any) {
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
    let result = await db.collection<User>(USERS).insertOne({
      _id: email,
      email,
      password,
      role,
    });
    return result.insertedId;
  } catch (error: any) {
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

async function updateCollection(
  filter: any,
  updateDoc: any,
  collection: string,
): Promise<number> {
  if (filter && updateDoc) {
    const result = await db
      .collection(collection)
      .updateOne(filter, updateDoc, { upsert: false });
    return result.modifiedCount;
  }
  return 0;
}

async function updateVoter(filter: any, updateDoc: any): Promise<number> {
  return await updateCollection(filter, { $set: updateDoc }, VOTERS);
}

async function updateUser(filter: any, updateDoc: any): Promise<number> {
  return await updateCollection(
    filter,
    { $set: { email: updateDoc.email } },
    USERS,
  );
}

async function findAllVoters(): Promise<VoterUpdate[]> {
  const voterArray = await db.collection<Voter>(VOTERS).find().toArray();
  return voterArray.map((voter) => ({
    nic: voter.nic,
    fullname: voter.fullname,
    gender: voter.gender,
    dob: voter.dob,
    email: voter.email,
  }));
}

async function createElection(election: Election): Promise<any> {
  try {
    const result = await db
      .collection<Election>(ELECTIONS)
      .insertOne({ _id: election.title, ...election });
    return result.insertedId;
  } catch (error: any) {
    console.log(error);
  }
}

export default {
  saveVoter,
  saveAdmin,
  saveUser,
  findUser,
  findVoter,
  deleteUser,
  deleteVoter,
  updateUser,
  updateVoter,
  findAllVoters,
  createElection,
};
