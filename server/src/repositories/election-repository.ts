import { FVSConfig } from "src/config";
import { Election } from "src/models/registration-models";
import configureDatabase from "./db";

export type ElectionRepository = {
  createElection: (election: Election) => Promise<string>;
};

export function getElectionRepository({
  environment,
}: FVSConfig): ElectionRepository {
  const db = configureDatabase(environment);

  async function createElection(election: Election): Promise<string> {
    return await db.createElection(election);
  }

  return {
    createElection,
  };
}
