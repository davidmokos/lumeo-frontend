import React from 'react'
import { createClient } from "@/utils/supabase/server";
import { SceneList } from './scene-list';
import { notFound } from 'next/navigation';

interface LectureCreatePageProps {
  params: {
    id: string;
  };
}

export default async function LectureCreatePage({ params }: LectureCreatePageProps) {
  const supabase = await createClient();

  // Fetch lecture
  const { data: lecture, error: lectureError } = await supabase
    .from("lectures")
    .select("*")
    .eq("id", params.id)
    .single();

  if (lectureError || !lecture) {
    notFound();
  }

  // Fetch scenes
  const { data: scenes } = await supabase
    .from("scenes")
    .select("*")
    .eq("lecture_id", params.id)
    .order("index", { ascending: true });

  return (
    <div className="container p-4">
      <SceneList initialLecture={lecture} initialScenes={scenes || []} />
    </div>
  );
}
