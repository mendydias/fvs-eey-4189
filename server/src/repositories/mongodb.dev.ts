import { MongoClient, ServerApiVersion } from "mongodb";
import { DuplicateKeyError } from "./errors";
import loadConfig from "../config";
import { Voter } from "src/models/registration-models";

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

async function saveVoter(voter: Voter): Promise<any> {
  try {
    let result = await db.collection(VOTERS).insertOne(voter);
    logger?.debug(result.insertedId);
    return result.insertedId;
  } catch (error: any) {
    logger?.error(error);
    if (error.code === 11000) {
      let result = await db
        .collection<Voter>(VOTERS)
        .findOne({ nic: voter.nic });
      throw new DuplicateKeyError(result?.nic || "unknown nic");
    }
  }
}

async function saveAdmin(user_id: string): Promise<string> {
  return "";
}

async function saveUser(email: string, password: string): Promise<string> {
  return "";
}

async function verifyUser(email: string, password: string): Promise<boolean> {
  return true;
}

export default {
  saveVoter,
  saveAdmin,
  saveUser,
  verifyUser,
};
