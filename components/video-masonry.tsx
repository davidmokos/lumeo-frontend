import { VideoGeneration } from "@/lib/models/video-generation";
import React from "react";

export default function VideoMasonry({
  videos,
}: {
  videos: VideoGeneration[];
}) {
  return (
    <div className="@container">
      <div className="columns-1 @[640px]:columns-2 @[1024px]:columns-3 gap-1 space-y-1">
        {videos.map((gen) => (
          <div
            key={gen.id}
            className="relative w-full break-inside-avoid overflow-hidden bg-muted/30"
          >
            <video
              src={gen.video_url || ""}
              className="w-full h-auto"
              loop
              muted
              playsInline
              autoPlay
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-xs text-white truncate">{gen.prompt}</p>
              {/* <p className="text-xs text-white/70">
                    {gen.completed_at?.toLocaleDateString()}
                  </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
