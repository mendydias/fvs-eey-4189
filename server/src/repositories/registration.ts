/**
 * @module Repository abstraction for the data layer.
 */
import { Voter } from "src/models/registration";
import db from "./dbconfig";
import config from "../config";

const { logger } = config;

// Describes the operations the database should be able to perform.
type VoterRepository = {
  // Save voter data to the database.
  save: (voter: Voter) => Promise<string>;
};

// The name of the collection. Use this global to access the collection for voter data.
const VOTERS = "voters";

async function save(voter: Voter): Promise<string> {
  logger?.debug(`Saving ${voter} to database.`);

  const voterRef = db.collection(VOTERS).doc(voter.nic);
  try {
    await voterRef.set(voter);
  } catch (e: any) {
    logger?.error(e);

    throw e;
  }
  return voter.nic;
}

const repo: VoterRepository = {
  save,
};

export default repo;
