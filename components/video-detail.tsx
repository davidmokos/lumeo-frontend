"use client";

import { VideoGeneration } from "@/lib/models/video-generation";
import { formatDistanceToNow } from "date-fns";

export function VideoDetail({ video }: { video: VideoGeneration }) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full aspect-video bg-muted/30 overflow-hidden">
        <video
          src={video?.video_url || ""}
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-lg font-semibold">{video?.prompt}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            {video?.width}x{video?.height} px
          </span>
          <span>•</span>
          <span>
            {video?.length ? `${Math.round(video.length / 25)} s` : ""}
          </span>
          <span>•</span>
          <span>
            {video?.created_at
              ? `${formatDistanceToNow(video.created_at)} ago`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
