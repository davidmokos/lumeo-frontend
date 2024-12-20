"use client";

import { VideoGeneration } from "@/lib/models/video-generation";
import React, { useEffect, useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle, DialogTrigger, ModalContent } from "./ui/dialog";
import { VideoDetail } from "./video-detail";
import { useRouter, usePathname } from "next/navigation";

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
        {videos.map((gen) => (
          <Dialog
            modal={true}
            key={gen.id}
            open={openVideoId === gen.id}
            onOpenChange={(open) => handleOpenChange(open, gen.id)}
          >
            <DialogTrigger asChild>
              <div className="relative w-full break-inside-avoid overflow-hidden bg-muted/30 cursor-pointer">
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
                </div>
              </div>
            </DialogTrigger>
            <ModalContent>
              <DialogTitle className="sr-only">Video Detail</DialogTitle>
              <VideoDetail video={gen} />
            </ModalContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
