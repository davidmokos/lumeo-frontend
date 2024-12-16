import { z } from "zod";

export const PredictionStatus = {
  Starting: 'starting',
  Processing: 'processing',
  Succeeded: 'succeeded',
  Failed: 'failed',
  Canceled: 'canceled'
} as const;

export type PredictionStatus = typeof PredictionStatus[keyof typeof PredictionStatus];

export const VideoGenerationSchema = z.object({
  id: z.string().uuid().nullish(),
  user_id: z.string().uuid().nullish(),
  created_at: z.date().nullish(),
  completed_at: z.date().nullish(),
  status: z.enum([
    PredictionStatus.Starting,
    PredictionStatus.Processing,
    PredictionStatus.Succeeded,
    PredictionStatus.Failed,
    PredictionStatus.Canceled
  ]).nullish(),
  prompt: z.string().nullish(),
  negative_prompt: z.string().nullish(),
  prompt_rewrite: z.string().nullish(),
  width: z.number().int().nullish(),
  height: z.number().int().nullish(),
  length: z.number().int().nullish(),
  video_url: z.string().nullish(),
  model: z.string().nullish(),
  replicate_prediction_id: z.string().nullish(),
});

export type VideoGeneration = z.infer<typeof VideoGenerationSchema>;
