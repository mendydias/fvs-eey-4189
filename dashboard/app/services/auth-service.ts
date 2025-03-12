import endpoints from "./endpoints.json";
import { z } from "zod";
import { createCookieSessionStorage, redirect } from "react-router";

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

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "remix_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    sameSite: "lax",
    secrets: ["your-secret-key"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: any) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function storeToken(request: any, token: string) {
  const session = await getSession(request);
  session.set("token", token);
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getToken(request: any) {
  const session = await getSession(request);
  return session.get("token");
}

export async function logout(request: any) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
