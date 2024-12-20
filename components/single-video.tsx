"use client";

import { VideoGeneration } from "@/lib/models/video-generation";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTitle, DialogTrigger, ModalContent } from "./ui/dialog";
import { VideoDetail } from "./video-detail";

interface SingleVideoProps {
  video: VideoGeneration;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SingleVideo({ video, isOpen, onOpenChange }: SingleVideoProps) {
  return (
    <Dialog modal={true} open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="relative w-full break-inside-avoid overflow-hidden bg-muted/30 cursor-pointer">
          <video
            src={video.video_url || ""}
            className="w-full h-auto"
            loop
            muted
            playsInline
            autoPlay
          />
          {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-xs text-white truncate">{video.prompt}</p>
          </div> */}
        </div>
      </DialogTrigger>
      <ModalContent>
        <DialogTitle className="sr-only">Video Detail</DialogTitle>
        <VideoDetail video={video} />
      </ModalContent>
    </Dialog>
  );
}
