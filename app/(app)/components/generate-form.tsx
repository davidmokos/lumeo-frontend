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
import { VideoGeneration } from "@/lib/models/video-generation";
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
  Clock6,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createVideoGeneration } from "../actions/actions";

export default function GenerateForm() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resolution, setResolution] = useState("480p");
  const [duration, setDuration] = useState("5s");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Helper function to calculate dimensions
    const calculateDimensions = (aspectRatio: string, resolution: string) => {
      const resolutionMap = {
        "480p": 480,
        "720p": 720,
        "1080p": 1080
      };

      const height = resolutionMap[resolution as keyof typeof resolutionMap];
      let width: number;

      switch (aspectRatio) {
        case "16:9":
          width = Math.round((height * 16) / 9);
          break;
        case "1:1":
          width = height;
          break;
        case "9:16":
          width = Math.round((height * 9) / 16);
          break;
        default:
          width = Math.round((height * 16) / 9); // default to 16:9
      }

      return { width, height };
    };

    const { width, height } = calculateDimensions(aspectRatio, resolution);

    const data: VideoGeneration = {
      prompt: prompt,
      length: parseInt(duration) * 25,
      width: width,
      height: height,
    }

    console.log(data);

    try {
      await createVideoGeneration(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while generating your video.",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Added to queue",
      description: "Please wait while we generate your video.",
    });

    setIsLoading(false);
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
            disabled={isLoading}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <div className="w-fit">
                <Select value={aspectRatio} onValueChange={setAspectRatio} disabled={isLoading}>
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
                <Select value={resolution} onValueChange={setResolution} disabled={isLoading}>
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
                <Select value={duration} onValueChange={setDuration} disabled={isLoading}>
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
                        <Clock6 className="h-4 w-4" />
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
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
