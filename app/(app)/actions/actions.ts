"use server";

import {
  PredictionStatus,
  VideoGeneration,
} from "@/lib/models/video-generation";
import { createClient } from "@/utils/supabase/server";
import Replicate from "replicate";

export async function createVideoGeneration(data: VideoGeneration) {
  const supabase = await createClient();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const {
    data: { user },
  } = await supabase.auth.getUser();
  data.user_id = user?.id;
  data.model =
    "tencent/hunyuan-video:847dfa8b01e739637fc76f480ede0c1d76408e1d694b830b5dfb8e547bf98405";

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  console.log(data.model);

  const output = await replicate.predictions.create({
    model: data.model.split(":")[0],
    version: data.model.split(":")[1],
    input: {
      width: data.width,
      height: data.height,
      prompt: data.prompt,
      flow_shift: 7,
      infer_steps: 50,
      video_length: data.length,
      embedded_guidance_scale: 6,
    },
    webhook: `${baseUrl}/api/replicate/webhook`,
    webhook_events_filter: ["start", "completed"],
  });
  console.log(output);

  data.replicate_prediction_id = output.id;
  data.status = PredictionStatus.Starting;

  const { error } = await supabase.from("video-generations").insert(data);

  if (error) {
    console.error("Error writing to database", error);
  }

  console.log("Creating video generation", data);
}
