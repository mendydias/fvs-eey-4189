import { fetch } from "expo/fetch";
import endpoints from "@/services/endpoints.json";

type Voter = {
  nic: string;
  email: string;
  fullname: string;
  gender: string;
  dob: Date;
};

async function registerVoter(voter: Voter) {
  let url =
    endpoints.base +
    endpoints.port +
    endpoints.services.registration.createVoter;
  await fetch(url, {
    headers: {
     "content" :
    }
  });
}

export default {
  registerVoter,
};
