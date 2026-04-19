import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Experience />
      
      {/* Spacer para hacer scroll y probar el Navbar */}
      <section className="h-[50vh] bg-black border-t border-white/5 flex items-center justify-center text-white/50">
        Próxima sección: Contacto y Redes
      </section>
    </main>
  );
}
