import endpoints from "./endpoints.json";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email address cannot be empty." })
    .email("Email address is invalid."),
  password: z.string({ required_error: "Password cannot be empty." }).max(50),
});

type User = z.infer<typeof loginSchema>;

export async function login(credentials: User) {
  const endpoint = `${endpoints.base.host}:${endpoints.base.port}${endpoints.login.endpoint}`;
  const payload = {
    method: endpoints.login.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  const response = await fetch(endpoint, payload);
  if (response.ok) {
    const json = await response.json();
    if (json.token) {
      return json.token;
    } else {
      throw new Error("Invalid response from login service.");
    }
  } else {
    return "unauthenticated";
  }
}
