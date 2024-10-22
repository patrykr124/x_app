import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(30, { message: "Maximum 30 character" })
    .nonempty(),
  username: z.string().min(3).max(30),
  bio: z.string().max(160),
});
