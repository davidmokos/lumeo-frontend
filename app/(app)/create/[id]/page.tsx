import React from "react";
import { getLectureWithScenes } from "@/lib/data";
import { SceneList } from "./scene-list";

export default async function LectureCreatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const { lecture, scenes } = await getLectureWithScenes(id);

  return (
    <div className="container p-4">
      <SceneList initialLecture={lecture} initialScenes={scenes} />
    </div>
  );
}
