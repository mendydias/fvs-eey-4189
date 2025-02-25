import { MongoClient, ServerApiVersion } from "mongodb";
import config from "../config";

const { logger } = config;

const connectionString = "mongodb://ranadmin:ranmal123@localhost:27017";

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("fvs");

async function save(collection: string, entity: any, _: any): Promise<any> {
  let result = await db.collection(collection).insertOne(entity);
  logger?.debug(result.insertedId);
  return result.insertedId;
}

export default {
  save,
};
