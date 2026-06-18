"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Datos de ejemplo: Puedes cambiar estos datos por tus proyectos reales
const PROJECTS = [
  {
    id: 1,
    titleKey: "workliTitle",
    descKey: "workliDesc",
    tech: ["Next.js", "TypeScript", "React", "Tailwind", "Server Actions", "API REST"],
    // Imagen real del proyecto
    image: "/images/worki.png",
    imageGradient: "from-red-900 to-black",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    titleKey: "ecommerceTitle",
    descKey: "ecommerceDesc",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    imageGradient: "from-zinc-800 to-black",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    titleKey: "geneticTitle",
    descKey: "geneticDesc",
    tech: ["Python", "Matplotlib", "Tkinter", "NumPy"],
    imageGradient: "from-red-950 to-zinc-900",
    githubUrl: "#",
    liveUrl: "#",
  },
];

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="py-24 relative bg-white dark:bg-[#050505] transition-colors duration-300 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("title")} <span className="text-red-600 dark:text-red-500">{t("titleHighlight")}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("description")}
            </p>
          </div>
          
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-6 py-3 bg-red-600/10 hover:bg-red-600/20 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-medium transition-all duration-300 whitespace-nowrap self-start md:self-auto"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 dark:hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.05)] dark:hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
            >
              {/* Project Image Container */}
              <div
                className={`w-full aspect-[16/10] bg-gradient-to-br ${project.imageGradient} relative overflow-hidden p-3 flex items-center justify-center`}
              >
                {project.image ? (
                  <div className="relative w-[95%] h-[95%] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={project.image}
                      alt={t(project.titleKey)}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>
                ) : (
                  <div className="relative w-[80%] h-[80%] rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <Code2 className="w-12 h-12 text-white/20" />
                  </div>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <Link
                    href={project.githubUrl}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-red-600 transition-colors"
                    title={t("viewCode")}
                  >
                    <GitBranch className="w-5 h-5" />
                  </Link>
                  <Link
                    href={project.liveUrl}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-red-600 transition-colors"
                    title={t("visitProject")}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {t(project.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-4">
                  {t(project.descKey)}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-gray-600 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer / Read More Button */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/5">
                  <Link
                    href={project.liveUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {t("learnMore")}
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
