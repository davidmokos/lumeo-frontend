import VideoMasonry from "@/components/video-masonry";
import { getDiscoverVideos } from "@/lib/data";

export default async function Home() {
  const videos = await getDiscoverVideos();

  return (
    <div className="min-h-screen p-1">
      <VideoMasonry videos={videos} />
    </div>
  );
}
