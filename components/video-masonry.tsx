"use client";

import { VideoGeneration } from "@/lib/models/video-generation";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SingleVideo } from "./single-video";

export default function VideoMasonry({
  videos,
}: {
  videos: VideoGeneration[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Extract video ID from pathname if it matches /discover/[id] or /video/[id]
    const match = pathname.match(/^\/(discover|video)\/(.+)$/);
    if (match) {
      const videoId = match[2];
      if (match[1] === 'video') {
        // If it's a /video/[id] path, change to /discover/[id]
        window.history.replaceState(null, '', `/discover/${videoId}`);
      }
      setOpenVideoId(videoId);
    } else {
      setOpenVideoId(null);
    }
  }, [pathname]);

  const handleOpenChange = (open: boolean, videoId?: string | null) => {
    if (open && videoId) {
      window.history.pushState(null, '', `/discover/${videoId}`);
      setOpenVideoId(videoId);
    } else if (!open) {
      router.back();
    }
  };

  return (
    <div className="@container">
      <div className="columns-1 @[640px]:columns-2 @[1024px]:columns-3 gap-1 space-y-1">
        {videos.map((video) => (
          <SingleVideo
            key={video.id}
            video={video}
            isOpen={openVideoId === video.id}
            onOpenChange={(open) => handleOpenChange(open, video.id)}
          />
        ))}
      </div>
    </div>
  );
}
