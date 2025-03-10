import { Voter } from "src/models/registration-models";

const saveVoter = async (voter: Voter) => "";

const saveAdmin = async (user_id: string) => "";

const saveUser = async (email: string, password: string) => "";

const verifyUser = async (email: string, password: string) => true;

export default {
  saveVoter,
  saveAdmin,
  saveUser,
  verifyUser,
};
