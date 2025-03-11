import { User, Voter, Admin, Role } from "src/models/registration-models";
import { DuplicateKeyError } from "./errors";

let voters: Map<string, Voter> = new Map();
let admins: Map<string, Admin> = new Map();
let users: Map<string, User> = new Map();

export function clearDb() {
  console.log("Clearing db");
  voters = new Map();
  admins = new Map();
  users = new Map();
}

const saveVoter = async (voter: Voter) => {
  if (voters.has(voter.nic)) {
    throw new DuplicateKeyError(voter.nic);
  }
  voters.set(voter.nic, { _id: voter.nic, ...voter });
  console.log("Inside save voter, db", voters);
  return voter.nic;
};

const saveAdmin = async (user_id: string) => {
  if (admins.has(user_id)) {
    throw new DuplicateKeyError(user_id);
  }
  const user = users.get(user_id);
  admins.set(user_id, {
    date_registered: new Date(),
    user: { id: user_id, email: user?.email },
  });
  console.log("Inside save admin, db", admins);
  return user_id;
};

const saveUser = async (email: string, password: string, role: Role) => {
  if (users.has(email)) {
    throw new DuplicateKeyError(email);
  }
  users.set(email, { email, password, role });
  console.log("Inside save user, db", users);
  return email;
};

const findUser = async (user: Partial<User>) => {
  console.log("Inside find user, db", users);
  if (user && user.email) {
    const dbUser = users.get(user.email);
    if (dbUser) {
      return dbUser;
    }
  }
  return null;
};

const findVoter = async (voter: Partial<Voter>) => {
  console.log("Inside find voter, db", voters);
  if (voter && voter.nic) {
    const dbVoter = voters.get(voter.nic);
    if (dbVoter) {
      return dbVoter;
    }
  }
  return null;
};

const deleteVoter = async (voter: Partial<Voter>) => {
  console.log("Inside delete voter, db", voters);
  if (voter && voter.nic) {
    return voters.delete(voter.nic); // this will return false if the voter doesn't exist
  }
  return false;
};

const deleteUser = async (user: Partial<User>) => {
  console.log("Inside delete user, db", users);
  if (user && user.email) {
    return users.delete(user.email); // this will return false if the user doesn't exist
  }
  return false;
};

const updateVoter = async (filter: any, updateDoc: any) => {
  let prevVoter = voters.get(filter.nic);
  if (!prevVoter) {
    return 0;
  }
  voters.delete(filter.nic);
  voters.set(filter.nic, {
    ...updateDoc,
    _id: filter.nic,
    password: prevVoter.password,
  });
  return 1;
};

const updateUser = async (filter: any, updateDoc: any) => {
  let prevUser = users.get(filter.email);
  if (!prevUser) {
    return 0;
  }
  users.delete(filter.email);
  users.set(filter.email, { ...prevUser, email: updateDoc.email });
  return 1;
};

const findAllVoters = async () => {
  const voterArray = Array.from(voters.values());
  return voterArray.map((voter) => ({
    nic: voter.nic,
    fullname: voter.fullname,
    dob: voter.dob,
    gender: voter.gender,
    email: voter.email,
  }));
};

export default {
  saveVoter,
  saveAdmin,
  saveUser,
  findUser,
  findVoter,
  deleteVoter,
  deleteUser,
  updateVoter,
  updateUser,
  findAllVoters,
};
