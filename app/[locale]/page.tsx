import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white selection:bg-red-500/30">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
