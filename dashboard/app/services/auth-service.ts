import endpoints from "./endpoints.json";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email address cannot be empty." })
    .email("Email address is invalid."),
  password: z.string({ required_error: "Password cannot be empty." }).max(50),
});

type User = z.infer<typeof loginSchema>;

export async function login(credentials: User) {}
