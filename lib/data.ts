"use server";

import { createClient } from "@/utils/supabase/server";
import { PredictionStatus, VideoGeneration } from "@/lib/models/video-generation";

export async function getDiscoverVideos(): Promise<VideoGeneration[]> {
  const supabase = await createClient();

  const { data: generations } = await supabase
    .from("video-generations")
    .select()
    .eq("status", PredictionStatus.Succeeded)
    .eq("show_in_discover", true)
    .order("completed_at", { ascending: false })
    .limit(20);

  return generations?.map((gen) => ({
    ...gen,
    created_at: new Date(gen.created_at),
    completed_at: gen.completed_at ? new Date(gen.completed_at) : null,
  })) || [];
}

export async function getUserVideos(): Promise<VideoGeneration[]> {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data: generations } = await supabase
    .from("video-generations")
    .select()
    .eq("user_id", user?.user?.id ?? "")
    .order("completed_at", { ascending: false, nullsFirst: true })
    .order("created_at", { ascending: false });

  return generations?.map((gen) => ({
    ...gen,
    created_at: new Date(gen.created_at),
    completed_at: gen.completed_at ? new Date(gen.completed_at) : null,
  })) || [];
}

export async function getVideoById(id: string): Promise<VideoGeneration | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("video-generations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching video:", error);
    return null;
  }

  return data as VideoGeneration;
}
