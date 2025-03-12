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

function fixGender(gender: string) {
  if (gender === "Male") {
    return "m";
  }
  return "f";
}

async function registerVoter(voter: CreateVoter) {
  voter.gender = fixGender(voter.gender);
  let url =
    "https://375f-2402-4000-2340-36a4-6039-4300-9dcd-a359.ngrok-free.app" +
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
      console.log("HTTP-Error: " + response.status);
    }
    let json = await response.json();
    return { ok: response.ok, json };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      json: error,
    };
  }
}

export default {
  registerVoter,
};
