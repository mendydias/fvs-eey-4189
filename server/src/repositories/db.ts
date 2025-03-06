import firebasedb from "./firebase";
import mongodbDev from "./mongodb.dev";

type Database = {
  save: (collection: string, entity: any, entityId: any) => Promise<any>;
};

export default function configureDatabase(environment: string): Database {
  switch (environment) {
    case "DEVELOPMENT": {
      return mongodbDev;
    }
    default:
      return firebasedb;
  }
}
