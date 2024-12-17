import { Hero } from "./components/hero";
import { Examples } from "./components/examples";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Examples />
    </div>
  );
}
