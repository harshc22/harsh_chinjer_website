import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { InternshipTimeline } from "@/components/ExperienceTimeline";
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <Hero />
      <InternshipTimeline />
    </div>
  );
}
