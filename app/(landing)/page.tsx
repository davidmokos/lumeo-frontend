import VideoMasonry from "@/components/video-masonry";
import { getDiscoverVideos } from "@/lib/data";

export default async function Home() {
  const videos = await getDiscoverVideos();

  return (
    <div className="min-h-screen px-1">
      <VideoMasonry videos={videos} />
    </div>
  );
}
