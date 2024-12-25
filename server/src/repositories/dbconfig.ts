// From firebase docs:
// https://firebase.google.com/docs/firestore/quickstart#node.js

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("./fvs-alpha-13290263e23d.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export default db;
