/**
 * @module Typechecked voter model
 */
import { z } from "zod";

export const VoterSchema = z.object({
  _id: z.optional(z.string()),
  nic: z.string(),
  fullname: z.string(),
  dob: z.string(),
  gender: z.enum(["m", "f", "o"], {
    required_error: "Gender is required",
    invalid_type_error:
      "Gender must be a string containing either 'm', 'f', or 'o'",
  }),
  email: z.string().email(),
  password: z.string(),
});

export const VoterUpdateSchema = z.object({
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

export const ElectionSchema = z.object({
  _id: z.optional(z.string()),
  start_date: z.date(),
  end_date: z.date(),
  title: z.string(),
});

export type Role = "voter" | "admin" | "candidate" | "all";
export type User = {
  _id?: string;
  email: string;
  password: string;
  role: Role;
};
export type VoterUpdate = z.infer<typeof VoterUpdateSchema>;
export type Voter = z.infer<typeof VoterSchema>;
export type Admin = z.infer<typeof AdminSchema>;
export type Election = z.infer<typeof ElectionSchema>;
