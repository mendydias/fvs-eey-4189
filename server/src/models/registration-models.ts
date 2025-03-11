/**
 * @module Typechecked voter model
 */
import { z } from "zod";

export const VoterSchema = z.object({
  _id: z.optional(z.string()),
  nic: z.string(),
  fullname: z.string(),
  dob: z.string().date(),
  gender: z.enum(["m", "f", "o"], {
    required_error: "Gender is required",
    invalid_type_error:
      "Gender must be a string containing either 'm', 'f', or 'o'",
  }),
  email: z.string().email(),
});

export const UserSchema = z.object({
  _id: z.optional(z.string()),
  email: z.string().email(),
  password: z.string(),
});

export const AdminSchema = z.object({
  date_registered: z.date(),
  user: z.object({
    id: z.string(),
    email: z.optional(z.string()),
  }),
});

export type User = z.infer<typeof UserSchema>;
export type Voter = z.infer<typeof VoterSchema>;
export type Admin = z.infer<typeof AdminSchema>;
