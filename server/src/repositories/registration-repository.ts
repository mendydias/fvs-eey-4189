/**
 * @module Repository abstraction for the data layer.
 */
import { Voter } from "../models/registration-models";
import configureDatabase from "./db";
import loadConfig from "../config";

const { logger, environment } = loadConfig();

// The save database call is abstracted so that the development version can use mongo
// and production can use firebase.
const db = configureDatabase(environment);

// Describes the operations the database should be able to perform.
type VoterRepository = {
  // Save voter data to the database.
  save: (voter: Voter) => Promise<string>;
};

// The name of the collection. Use this global to access the collection for voter data.
const VOTERS = "voters";

// Voter methods
async function save(voter: Voter): Promise<string> {
  logger?.debug(`Saving ${voter.nic}:${voter.fullname} to database.`);
  return db.save(VOTERS, voter, voter.nic);
}

const repo: VoterRepository = {
  save,
};

export default repo;
