"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Lecture, Scene } from "@/lib/models/lecture";
import { Loader2 } from "lucide-react";

interface SceneListProps {
  initialLecture: Lecture;
  initialScenes: Scene[];
}

export function SceneList({ initialLecture, initialScenes }: SceneListProps) {
  const [lecture, setLecture] = useState<Lecture>(initialLecture);
  const [scenes, setScenes] = useState<Scene[]>(initialScenes);
  const supabase = createClient();

  useEffect(() => {
    if (!lecture.id) return;

    // Subscribe to lecture changes
    const lectureChannel = supabase
      .channel("lecture_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lectures",
          filter: `id=eq.${lecture.id}`,
        },
        (payload) => {
          setLecture(payload.new as Lecture);
        }
      )
      .subscribe();

    // Subscribe to scene changes
    const scenesChannel = supabase
      .channel("scenes_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scenes",
          filter: `lecture_id=eq.${lecture.id}`,
        },
        async () => {
          // Fetch all scenes to get the updated list
          const { data } = await supabase
            .from("scenes")
            .select("*")
            .eq("lecture_id", lecture.id)
            .order("index", { ascending: true });
          
          if (data) {
            setScenes(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(lectureChannel);
      supabase.removeChannel(scenesChannel);
    };
  }, [lecture.id]);

  if (scenes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Generating scenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {scenes.map((scene) => (
        <div
          key={scene.id}
          className="grid grid-cols-2 gap-8 p-6 rounded-lg border bg-card"
        >
          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
            {scene.status === "processing" ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : scene.video_url ? (
              <video
                src={scene.video_url}
                controls
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Scene {scene.index}</h3>
              <p className="text-sm text-muted-foreground">
                Status: {scene.status}
              </p>
            </div>
            {scene.voiceover && (
              <div className="prose prose-sm max-w-none">
                <p>{scene.voiceover}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 