import { Voter } from "src/models/registration-models";
import firebasedb from "./firebase";
import mockdbTest from "./mockdb.test";
import mongodbDev from "./mongodb.dev";

type Database = {
  saveVoter: (voter: Voter) => Promise<string>;
  saveAdmin: (user_id: string) => Promise<string>;
  saveUser: (email: string, password: string) => Promise<string>;
  verifyUser: (email: string, password: string) => Promise<boolean>;
};

export default function configureDatabase(
  environment: "PRODUCTION" | "DEVELOPMENT" | "TESTING",
): Database {
  switch (environment) {
    case "DEVELOPMENT": {
      return mongodbDev;
    }
    case "PRODUCTION":
      return firebasedb;
    case "TESTING":
      return mockdbTest;
    default:
      throw new Error("Invalid environment");
  }
}
