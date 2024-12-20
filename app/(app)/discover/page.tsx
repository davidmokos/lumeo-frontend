import VideoMasonry from "@/components/video-masonry";
import { getDiscoverVideos } from "@/lib/data";

export default async function DiscoverPage() {
  const videoGenerations = await getDiscoverVideos();

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto px-1 pb-20">
        <VideoMasonry videos={videoGenerations} />
      </div>
      {/* <div className="absolute bottom-4 left-0 right-0 p-4 bg-background border-t">
        <GenerateForm />
      </div> */}
    </div>
  );
}
