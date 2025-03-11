import { Role, User, Voter } from "src/models/registration-models";
import firebasedb from "./firebase";
import mockdbTest from "./mockdb";
import mongodbDev from "./mongodb.dev";

type Database = {
  saveVoter: (voter: Voter) => Promise<string>;
  saveAdmin: (user_id: string) => Promise<string>;
  saveUser: (
    email: string,
    password: string,
    role: Role,
  ) => Promise<string | null>;
  findUser: (user: Partial<User>) => Promise<User | null>;
  findVoter: (voter: Partial<Voter>) => Promise<Voter | null>;
  deleteUser: (user: Partial<User>) => Promise<boolean>;
  deleteVoter: (voter: Partial<Voter>) => Promise<boolean>;
  updateVoter: (filter: any, updateDoc: any) => Promise<number>;
  updateUser: (filter: any, updateDoc: any) => Promise<number>;
};

export default function configureDatabase(
  environment: "PRODUCTION" | "DEVELOPMENT" | "TESTING",
): Database {
  switch (environment) {
    case "DEVELOPMENT":
      return mongodbDev;
    case "PRODUCTION":
      return firebasedb;
    case "TESTING":
      return mockdbTest;
    default:
      throw new Error("Invalid environment");
  }
}
