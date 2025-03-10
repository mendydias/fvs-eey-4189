import { User, Voter, Admin } from "src/models/registration-models";

const voters: Map<string, Voter> = new Map();
const admins: Map<string, Admin> = new Map();
const users: Map<string, User> = new Map();

const saveVoter = async (voter: Voter) => {
  voters.set(voter.nic, { _id: voter.nic, ...voter });
  console.log("Inside save voter, db", voters);
  return voter.nic;
};

const saveAdmin = async (user_id: string) => {
  const user = users.get(user_id);
  admins.set(user_id, {
    date_registered: new Date(),
    user: { id: user_id, email: user?.email },
  });
  console.log("Inside save admin, db", admins);
  return user_id;
};

const saveUser = async (email: string, password: string) => {
  users.set(email, { email, password });
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

export default {
  saveVoter,
  saveAdmin,
  saveUser,
  findUser,
};
