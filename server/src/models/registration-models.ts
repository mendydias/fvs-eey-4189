/**
 * @module Typechecked voter model
 */
import { z } from "zod";

export const VoterSchema = z.object({
  nic: z.string().min(10),
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
  email: z.string().email(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Voter = z.infer<typeof VoterSchema>;
