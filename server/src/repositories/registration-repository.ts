/**
 * @module Repository abstraction for the data layer.
 */
import { Voter } from "../models/registration-models";
import config from "../config";
import configureDatabase from "./db";

const { logger } = config;

// The save database call is abstracted so that the development version can use mongo
// and production can use firebase.
const db = configureDatabase("DEVELOPMENT");

// Describes the operations the database should be able to perform.
type VoterRepository = {
  // Save voter data to the database.
  save: (voter: Voter) => Promise<string>;
};

// The name of the collection. Use this global to access the collection for voter data.
const VOTERS = "voters";

async function save(voter: Voter): Promise<string> {
  logger?.debug(`Saving ${voter.nic}:${voter.fullname} to database.`);
  return db.save(VOTERS, voter, voter.nic);
}

const repo: VoterRepository = {
  save,
};

export default repo;
