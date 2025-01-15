"use client";

import { useContext, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { getUserLectures } from "@/lib/data";
import { MyLecturesContext } from "./my-lectures-context";
import { Lecture } from "@/lib/models/lecture";

export function useMyLectures() {
  const context = useContext(MyLecturesContext);
  if (!context) {
    throw new Error("useMyLectures must be used within a MyLecturesProvider");
  }
  return context;
}

export function useMyLecturesState(
  userId: string,
  initialLectures: Lecture[] = []
) {
  const [lectures, setLectures] = useState<Lecture[]>(initialLectures);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) return;

    fetchLectures();

    const channel = supabase
      .channel("lectures")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lectures",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchLectures();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchLectures = async () => {
    const allData = await getUserLectures();
    setLectures(allData);
  };

  return { lectures };
}
