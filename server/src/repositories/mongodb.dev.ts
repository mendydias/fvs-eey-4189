import { MongoClient, ServerApiVersion } from "mongodb";
import config from "../config";
import { DuplicateKeyError } from "./errors";

const { logger, database_uri } = config;

const client = new MongoClient(database_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("fvs");

async function save(
  collection: string,
  entity: any,
  entityId: any,
): Promise<any> {
  try {
    let result = await db
      .collection(collection)
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
