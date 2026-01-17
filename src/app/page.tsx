import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { AboutSection } from "@/components/About";
import { SectionTransition } from "@/components/SectionTransition";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <Hero />
      <SectionTransition />
      <AboutSection />
      <ExperienceTimeline />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
