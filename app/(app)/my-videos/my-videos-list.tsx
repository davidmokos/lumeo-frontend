"use client";

import { VideoGeneration, PredictionStatus } from "@/lib/models/video-generation";
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns";
import { Loader2, X } from "lucide-react";
import { useVideoQueue } from "@/hooks/use-video-queue";

type GroupedVideos = {
  [key: string]: VideoGeneration[];
};

export function MyVideosList() {
  const { allVideos: videos } = useVideoQueue();

  // Group videos by date
  const groupedVideos = videos.reduce((groups: GroupedVideos, video) => {
    const date = video.completed_at || video.created_at || new Date();
    let dateKey = format(date, 'MM/dd');
    
    if (isToday(date)) {
      dateKey = 'Today';
    } else if (isYesterday(date)) {
      dateKey = 'Yesterday';
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(video);
    return groups;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-12">
      {Object.entries(groupedVideos).map(([date, dateVideos]) => (
        <div key={date}>
          <h2 className="text-2xl font-semibold mb-6 text-muted-foreground">{date}</h2>
          <div className="space-y-8">
            {dateVideos.map((gen) => (
              <div key={gen.id} className="flex flex-col space-y-3">
                <div className="relative w-full max-w-2xl overflow-hidden bg-muted/30">
                  {gen.status === PredictionStatus.Succeeded ? (
                    <video
                      src={gen.video_url || ""}
                      className="w-full h-auto"
                      loop
                      muted
                      playsInline
                      autoPlay
                      controls
                    />
                  ) : (
                    <div className="w-full relative bg-muted/30">
                      <div className="pb-[56.25%]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {gen.status === PredictionStatus.Failed ? (
                          <X className="w-10 h-10" />
                        ) : (
                          <Loader2 className="w-10 h-10 animate-spin" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="max-w-2xl space-y-2">
                  <p className="text-white text-md">{gen.prompt}</p>
                  <div className="text-muted-foreground text-sm space-x-3">
                    <span>
                      {gen.width}x{gen.height} px
                    </span>
                    <span>•</span>
                    <span>{gen.length ? `${Math.round(gen.length / 25)} s` : ''}</span>
                    <span>•</span>
                    <span>{gen.created_at ? formatDistanceToNow(gen.created_at) : ''} ago</span>
                    <span>•</span>
                    <span>{gen.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 