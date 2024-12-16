"use server";

import { VideoGeneration } from "@/lib/models/video-generation";
import { createClient } from "@/utils/supabase/server";

export async function createVideoGeneration(data: VideoGeneration) {
  const supabase = createClient();


  console.log("Creating video generation", data);
}
