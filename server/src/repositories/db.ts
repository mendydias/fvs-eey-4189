import { User, Voter } from "src/models/registration-models";
import firebasedb from "./firebase";
import mockdbTest from "./mockdb";
import mongodbDev from "./mongodb.dev";

type Database = {
  saveVoter: (voter: Voter) => Promise<string>;
  saveAdmin: (user_id: string) => Promise<string>;
  saveUser: (email: string, password: string) => Promise<string | null>;
  findUser: (user: Partial<User>) => Promise<User | null>;
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
