import React from 'react'
import { getLectureWithScenes } from "@/lib/data";
import { SceneList } from './scene-list';

interface LectureCreatePageProps {
  params: {
    id: string;
  };
}

export default async function LectureCreatePage({ params }: LectureCreatePageProps) {
  const { lecture, scenes } = await getLectureWithScenes(params.id);

  return (
    <div className="container p-4">
      <SceneList initialLecture={lecture} initialScenes={scenes} />
    </div>
  );
}
