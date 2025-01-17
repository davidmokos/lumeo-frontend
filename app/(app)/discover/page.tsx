import { getDiscoverLectures } from "@/lib/data";
import { Lecture } from "@/lib/models/lecture";
import Link from "next/link";

export default async function DiscoverPage() {
  const lectures = await getDiscoverLectures();

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-8">Discover Lectures</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <Link
            key={lecture.id}
            href={`/create/${lecture.id}`}
            className="group relative rounded-lg overflow-hidden border bg-card hover:border-primary transition-colors"
          >
            <div className="aspect-video relative">
              {lecture.video_url ? (
                <video
                  src={lecture.video_url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={e => (e.target as HTMLVideoElement).play()}
                  onMouseLeave={e => {
                    const video = e.target as HTMLVideoElement;
                    video.pause();
                    video.currentTime = 0;
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No preview</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold group-hover:text-primary transition-colors">
                {lecture.title || lecture.topic}
              </h2>
              {lecture.resources && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {lecture.resources}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
