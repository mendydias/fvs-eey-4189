import { z } from "zod";

const Voter = z.object({
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

export type Voter = z.infer<typeof Voter>;

export default Voter;
