"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Code2 } from "lucide-react";
import Link from "next/link";

// Datos de ejemplo: Puedes cambiar estos datos por tus proyectos reales
const PROJECTS = [
  {
    id: 1,
    title: "Sistema de Gestión Académica",
    description:
      "Plataforma integral para la gestión de alumnos, calificaciones y horarios. Desarrollado como proyecto principal de la carrera enfocándome en arquitectura escalable.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    // Usamos un div con gradiente como placeholder de la imagen por ahora
    imageGradient: "from-red-900 to-black",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "E-Commerce API REST",
    description:
      "Backend completo para comercio electrónico con autenticación, pasarela de pagos, gestión de inventario y optimización de consultas a la base de datos.",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    imageGradient: "from-zinc-800 to-black",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Algoritmo Genético - Optimización",
    description:
      "Implementación de un algoritmo genético en Python para resolver el problema del viajante de comercio (TSP), con interfaz gráfica y visualización de datos.",
    tech: ["Python", "Matplotlib", "Tkinter", "NumPy"],
    imageGradient: "from-red-950 to-zinc-900",
    githubUrl: "#",
    liveUrl: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mis Proyectos <span className="text-red-500">Destacados</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Una selección de los proyectos y prácticas que he desarrollado durante mi formación como Ingeniero en Software, demostrando mis habilidades técnicas y de resolución de problemas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
            >
              {/* Project Image Placeholder */}
              <div
                className={`w-full h-48 bg-gradient-to-br ${project.imageGradient} relative overflow-hidden flex items-center justify-center`}
              >
                {/* Simulated Image Content */}
                <Code2 className="w-12 h-12 text-white/20 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <Link
                    href={project.githubUrl}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-red-600 transition-colors"
                    title="Ver Código"
                  >
                    <GitBranch className="w-5 h-5" />
                  </Link>
                  <Link
                    href={project.liveUrl}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-red-600 transition-colors"
                    title="Visitar Proyecto"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-md text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer / Read More Button */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link
                    href={project.liveUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-red-500 transition-colors"
                  >
                    Saber más sobre el proyecto
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
