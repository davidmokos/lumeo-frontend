import { getDiscoverLectures } from "@/lib/data";
import { LectureGrid } from "@/components/lecture-grid";
import { LearnPrompt } from "./components/learn-prompt";

export default async function Home() {
  const lectures = await getDiscoverLectures();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* <h1 className="text-4xl font-bold text-center mb-6">
        Learn Anything with AI-Generated Video Lectures
      </h1> */}
      
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-4xl font-bold text-center mb-6">
          Create a video lecture just for you.
        </h1>
        <LearnPrompt />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        See what others are learning
      </h2>

      <LectureGrid lectures={lectures} />
    </div>
  );
}
