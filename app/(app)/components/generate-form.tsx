"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoGenerationSchema } from "@/lib/models/video-generation";
import {
  RectangleHorizontal,
  Square,
  RectangleVertical,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
} from "lucide-react";

export default function GenerateForm() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resolution, setResolution] = useState("480p");
  const [duration, setDuration] = useState("5s");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
  };

  return (
    <div className="w-full p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-3xl mx-auto w-full"
      >
        <div className="rounded-3xl bg-background/50 backdrop-blur-xl border border-white/10 shadow-lg p-4">
          <Textarea
            placeholder="Describe your video..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[50px] max-h-[100px] resize-none border-none bg-transparent focus-visible:ring-0 placeholder:text-foreground/50"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <div className="w-fit">
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="h-8 rounded-full backdrop-blur-xl border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">
                      <div className="flex items-center gap-2">
                        <RectangleHorizontal className="h-4 w-4" />
                        <span>16:9</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="1:1">
                      <div className="flex items-center gap-2">
                        <Square className="h-4 w-4" />
                        <span>1:1</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="9:16">
                      <div className="flex items-center gap-2">
                        <RectangleVertical className="h-4 w-4" />
                        <span>9:16</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-fit">
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="h-8 rounded-full bg-background/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="480p">
                      <div className="flex items-center gap-2">
                        <SignalLow className="h-4 w-4" />
                        <span>480p</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="720p">
                      <div className="flex items-center gap-2">
                        <SignalMedium className="h-4 w-4" />
                        <span>720p</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="1080p">
                      <div className="flex items-center gap-2">
                        <SignalHigh className="h-4 w-4" />
                        <span>1080p</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-fit">
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="h-8 rounded-full bg-background/50 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5s">
                      <div className="flex items-center gap-2">
                        <Clock1 className="h-4 w-4" />
                        <span>5s</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="10s">
                      <div className="flex items-center gap-2">
                        <Clock2 className="h-4 w-4" />
                        <span>10s</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="15s">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        <span>15s</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="30s">
                      <div className="flex items-center gap-2">
                        <Clock4 className="h-4 w-4" />
                        <span>30s</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              size="sm"
              className="rounded-full bg-primary/80 hover:bg-primary/90 backdrop-blur-sm"
            >
              Generate
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
