import { z } from "zod";

export const VideoGenerationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  created_at: z.date().default(() => new Date()),
  completed_at: z.date().nullable(),
  status: z.string().nullable(),
  prompt: z.string().nullable(),
  negative_prompt: z.string().nullable(),
  prompt_rewrite: z.string().nullable(),
  width: z.number().int().nullable(),
  height: z.number().int().nullable(),
  length: z.number().int().nullable(),
  video_url: z.string().nullable(),
});

export type VideoGeneration = z.infer<typeof VideoGenerationSchema>;
