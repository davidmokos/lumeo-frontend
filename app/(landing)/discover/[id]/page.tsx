import { VideoDetail } from "@/components/video-detail";
import { getVideoById } from "@/lib/data";
import React from "react";

type Params = Promise<{ id: string }>;

export default async function DetailPage(props: { params: Params }) {
  const { id } = await props.params;

  const video = await getVideoById(id);

  if (!video) {
    return <div>Video not found</div>;
  }

  return <VideoDetail video={video} />;
}
