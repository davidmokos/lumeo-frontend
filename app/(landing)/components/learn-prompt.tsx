"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function LearnPrompt() {
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="What do you want to learn?"
          className="min-h-[120px] text-lg p-4 resize-none"
          onClick={redirectToLogin}
          readOnly
        />
        <Button 
          onClick={redirectToLogin} 
          size="lg"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 animate-pulse"
        >
          Generate Video Lecture
        </Button>
      </div>
    </div>
  );
} 