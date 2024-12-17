import { getDiscoverVideos } from "@/lib/data";

export default async function DiscoverPage() {
  const videoGenerations = await getDiscoverVideos();

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto px-2 pb-20">
        <div className="@container">
          <div className="columns-1 @[640px]:columns-2 @[1024px]:columns-3 gap-1 space-y-1">
            {videoGenerations.map((gen) => (
              <div
                key={gen.id}
                className="relative w-full break-inside-avoid overflow-hidden bg-muted/30"
              >
                <video
                  src={gen.video_url || ""}
                  className="w-full h-auto"
                  loop
                  muted
                  playsInline
                  autoPlay
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xs text-white truncate">{gen.prompt}</p>
                  {/* <p className="text-xs text-white/70">
                    {gen.completed_at?.toLocaleDateString()}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-4 left-0 right-0 p-4 bg-background border-t">
        <GenerateForm />
      </div> */}
    </div>
  );
}
