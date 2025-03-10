import { MongoClient, ServerApiVersion } from "mongodb";
import { DuplicateKeyError } from "./errors";
import loadConfig from "../config";

const { logger, database_uri } = loadConfig();

const client = new MongoClient(database_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("fvs");

async function saveVoter(voter: Voter): Promise<any> {
  try {
    let result = await db
      .collection("voters")
      .insertOne({ _id: entityId, ...entity });
    logger?.debug(result.insertedId);
    return result.insertedId;
  } catch (error: any) {
    logger?.error(error);
    if (error.code === 11000) {
      throw new DuplicateKeyError(entityId);
    }
  }
}

export default {
  save,
};
