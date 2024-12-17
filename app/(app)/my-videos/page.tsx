import { getUserVideos } from "@/lib/data";
import { createClient } from "@/utils/supabase/server";
import { MyVideosList } from "./my-videos-list";
import { VideoQueueProvider } from "@/hooks/video-queue-context";

export default async function MyVideosPage() {
//   const supabase = await createClient();
//   const { data: user } = await supabase.auth.getUser();
//   const videoGenerations = await getUserVideos();

//   if (!user?.user?.id) {
//     return null;
//   }

  return (
      <div className="flex flex-col">
        <MyVideosList />
      </div>
  );
}
