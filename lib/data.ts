"use server";

import { createClient } from "@/utils/supabase/server";
import { PredictionStatus } from "@/lib/models/video-generation";

export async function getDiscoverVideos() {
  const supabase = await createClient();

  const { data: generations } = await supabase
    .from("video-generations")
    .select()
    .eq("status", PredictionStatus.Succeeded)
    .order("completed_at", { ascending: false })
    .limit(20);

  return generations?.map((gen) => ({
    ...gen,
    created_at: new Date(gen.created_at),
    completed_at: gen.completed_at ? new Date(gen.completed_at) : null,
  })) || [];
}

export async function getUserVideos() {
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
