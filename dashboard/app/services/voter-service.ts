import { z } from "zod";
import endpoints from "./endpoints.json";

export const VoterSchema = z.object({
  nic: z.string(),
  fullname: z.string(),
  dob: z.string(),
  gender: z.union([z.literal("m"), z.literal("f"), z.literal("o")]),
  email: z.string(),
});
export type Voter = z.infer<typeof VoterSchema>;

export const ElectionSchema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date(),
  title: z.string(),
});
export type Election = z.infer<typeof ElectionSchema>;

export async function getAllVoters(token: string) {
  const endpoint = `${endpoints.base.host}:${endpoints.base.port}${endpoints.voter.all.endpoint}`;
  const payload = {
    method: endpoints.voter.all.method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(endpoint, payload);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Invalid response from voter service.");
  }
}

export async function registerVoter(voter: Voter) {
  const endpoint = `${endpoints.base.host}:${endpoints.base.port}${endpoints.voter.register.endpoint}`;
  const payload = {
    method: endpoints.voter.register.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voter),
  };
  const response = await fetch(endpoint, payload);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const text = await response.text();
    console.log(text);
    throw new Error(
      "Invalid response from voter service trying to register voter."
    );
  }
}

export async function createElection(token: string, election: Election) {
  const endpoint = `${endpoints.base.host}:${endpoints.base.port}${endpoints.election.create.endpoint}`;
  const payload = {
    method: endpoints.election.create.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(election),
  };

  const response = await fetch(endpoint, payload);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const text = await response.text();
    console.log(text);
    throw new Error(
      "Invalid response from the service trying to create an election"
    );
  }
}
