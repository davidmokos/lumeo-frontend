import { getDiscoverLectures } from "@/lib/data";
import { LectureGrid } from "@/components/lecture-grid";

export default async function DiscoverPage() {
  const lectures = await getDiscoverLectures();

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-8">Discover Lectures</h1>
      <LectureGrid lectures={lectures} />
    </div>
  );
}
