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
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voter),
    });
    if (!response.ok) {
      console.log(`Response status: ${response.status}`);
    }

    let json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export default {
  registerVoter,
};
