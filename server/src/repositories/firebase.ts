// // From firebase docs:
// // https://firebase.google.com/docs/firestore/quickstart#node.js
//
// import config from "../config";
//
// // Setup firebase
// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
//   Filter,
// } = require("firebase-admin/firestore");
//
// const serviceAccount = require("./fvs-alpha-13290263e23d.json");
//
// initializeApp({
//   credential: cert(serviceAccount),
// });
//
// const db = getFirestore();
//
// // utility functions
// async function save(collection: string, entity: any, entityId: any) {
//   const entityRef = db.collection(collection).doc(entityId);
//   try {
//     await entityRef.set(entity);
//   } catch (e: any) {
//     config.logger?.error(e);
//
//     throw e;
//   }
//   return entityId;
// }
//
async function save(collection: string, entity: any, entityId: any) {
  return "jsafa";
}

export default {
  save,
};
