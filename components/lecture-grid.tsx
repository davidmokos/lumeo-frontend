import { Lecture } from "@/lib/models/lecture";

interface LectureGridProps {
  lectures: Lecture[];
}

export function LectureGrid({ lectures}: LectureGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
      {lectures.map((lecture) => (
        <div
          key={lecture.id}
          
          className="group relative rounded-lg overflow-hidden border bg-card "
        >
          <div className="aspect-video relative">
            {lecture.video_url ? (
              <video
                src={lecture.video_url}
                className="w-full h-full object-cover"
                poster={lecture.thumbnail_url}
                controls={true}
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
            
          </div>
        </div>
      ))}
    </div>
  );
} 