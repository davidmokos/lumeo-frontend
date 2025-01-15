"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://davidmokos--learn-anything-api.modal.run/api/v1"
    : "https://davidmokos--learn-anything-api-dev.modal.run/api/v1";

export function GenerateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [resources, setResources] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to generate a video lecture",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/generate/${user.id}/lecture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic,
            resources,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Failed to generate lecture (${response.status}: ${response.statusText})`
        );
      }

      const data = await response.json();

      if (!data.lecture_id) {
        throw new Error("No lecture ID returned from the server");
      }

      toast({
        title: "Success",
        description:
          "Lecture generation started. You'll be redirected to the lecture page.",
      });

      router.push(`/create/${data.lecture_id}`);
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate lecture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div className="space-y-2">
        <Input
          placeholder="What do you want to learn?"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Paste here any additional resources"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate video lecture"}
      </Button>
    </form>
  );
}
