import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(3).max(3000),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(1), //
});

