import { fetch } from "expo/fetch";
import endpoints from "@/services/endpoints.json";

type CreateVoter = {
  nic: string;
  email: string;
  fullname: string;
  gender: string;
  dob: Date;
  password: string;
};

async function registerVoter(voter: CreateVoter) {
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
