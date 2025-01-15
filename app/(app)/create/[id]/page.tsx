import React from 'react'
import { createClient } from "@/utils/supabase/server";
import { SceneList } from './scene-list';
import { notFound } from 'next/navigation';


export default async function LectureCreatePage(props: {params: Promise<{id: string}>}) {
  const supabase = await createClient();
  const { id } = await props.params;


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

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{lecture.title || lecture.topic}</h1>
        {lecture.resources && (
          <p className="mt-2 text-muted-foreground">{lecture.resources}</p>
        )}
      </div>

      <SceneList initialLecture={lecture} initialScenes={scenes || []} />
    </div>
  );
}
