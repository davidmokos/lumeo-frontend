"use server";

import { createClient } from "@/utils/supabase/server";
import { PredictionStatus, VideoGeneration } from "@/lib/models/video-generation";
import { Lecture, Scene } from "./models/lecture";
import { notFound } from "next/navigation";

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


export async function getUserLectures(): Promise<Lecture[]> {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data: lectures } = await supabase
    .from("lectures")
    .select()
    .eq("user_id", user?.user?.id ?? "")
    .order("created_at", { ascending: false });

  return lectures || [];
}

export async function getDiscoverLectures(): Promise<Lecture[]> {
  const supabase = await createClient();

  const { data: lectures } = await supabase
    .from("lectures")
    .select()
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return lectures || [];
}

export async function getLectureWithScenes(id: string): Promise<{ lecture: Lecture; scenes: Scene[] }> {
  const supabase = await createClient();

  // Fetch lecture
  const { data: lecture, error: lectureError } = await supabase
    .from("lectures")
    .select("*")
    .eq("id", id)
    .single();

  if (lectureError || !lecture) {
    notFound();
  }

  // Fetch scenes
  const { data: scenes } = await supabase
    .from("scenes")
    .select("*")
    .eq("lecture_id", id)
    .order("index", { ascending: true });

  return {
    lecture,
    scenes: scenes || []
  };
}

export async function getScenes(lectureId: string): Promise<Scene[]> {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data: scenes } = await supabase
    .from("scenes")
    .select()
    .eq("lecture_id", lectureId)
    .order("created_at", { ascending: false });

  return scenes || [];
}

