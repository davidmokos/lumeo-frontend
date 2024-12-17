"use client";

import { useContext, useEffect, useState } from "react";
import {
  VideoGeneration,
  PredictionStatus,
} from "@/lib/models/video-generation";
import { createClient } from "@/utils/supabase/client";
import { VideoQueueContext } from "./video-queue-context";
import { getUserVideos } from "@/lib/data";

export function useVideoQueue() {
  const context = useContext(VideoQueueContext);
  if (!context) {
    throw new Error("useVideoQueue must be used within a VideoQueueProvider");
  }
  return context;
}

export function useVideoQueueState(
  userId: string,
  initialVideos: VideoGeneration[] = []
) {
  const [allVideos, setAllVideos] = useState<VideoGeneration[]>(initialVideos);
  const [queueVideos, setQueueVideos] = useState<VideoGeneration[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) return;

    fetchVideos();

    const channel = supabase
      .channel("video_generations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "video-generations",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchVideos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchVideos = async () => {
    const allData = await getUserVideos();
    setAllVideos(allData);
    setQueueVideos(
      allData.filter((video) =>
        [PredictionStatus.Starting, PredictionStatus.Processing].includes(
          video.status
        )
      )
    );
  };

  return { allVideos, queueVideos };
}
