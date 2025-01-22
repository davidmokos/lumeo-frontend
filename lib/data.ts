"use server";

import { createClient } from "@/utils/supabase/server";
import { Lecture, Scene } from "./models/lecture";
import { notFound } from "next/navigation";


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
    // .eq("status", "published")
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

  const { data: scenes } = await supabase
    .from("scenes")
    .select()
    .eq("lecture_id", lectureId)
    .order("created_at", { ascending: false });

  return scenes || [];
}

