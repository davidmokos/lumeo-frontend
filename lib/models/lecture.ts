import { z } from "zod";

export const LectureStatus = z.enum(["processing", "draft", "published"]);
export type LectureStatus = z.infer<typeof LectureStatus>;

export const SceneStatus = z.enum(["processing", "completed", "failed"]);
export type SceneStatus = z.infer<typeof SceneStatus>;

export const Scene = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  lecture_id: z.string().optional(),

  status: SceneStatus.default("processing"),
  index: z.number().optional(),
  version: z.number().optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),

  description: z.string().optional(),
  voiceover: z.string().optional(),

  user_prompt: z.string().optional(),

  code: z.string().optional(),

  audio_url: z.string().url().optional(),
  video_url: z.string().url().optional(),
});
export type Scene = z.infer<typeof Scene>;

export const Lecture = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),

  topic: z.string().optional(),
  resources: z.string().optional(),

  title: z.string().optional(),
  status: LectureStatus.default("processing"),

  voice_id: z.string().optional(),
  language: z.string().optional(),

  video_url: z.string().url().optional(),
  subtitles_url: z.string().url().optional(),
  thumbnail_url: z.string().url().optional(),
});
export type Lecture = z.infer<typeof Lecture>; 