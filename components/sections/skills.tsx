"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  LayoutTemplate,
  Wrench,
  TerminalSquare
} from "lucide-react";

// Categorías basadas en la imagen del CV
const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Web Frontend",
    icon: <LayoutTemplate className="w-6 h-6" />,
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
    color: "from-red-500 to-orange-500",
  },
  {
    id: "languages",
    title: "Lenguajes",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["TypeScript", "JavaScript", "Kotlin"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: <Smartphone className="w-6 h-6" />,
    skills: ["Kotlin", "Jetpack Compose", "Clean Architecture"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "tools",
    title: "Herramientas & Otros",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      "Git / GitHub",
      "Consumo de APIs REST",
      "Diseño UI/UX (Figma)",
      "npm",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mis <span className="text-red-500">Habilidades</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conjunto de tecnologías y herramientas que utilizo para transformar ideas en productos digitales funcionales y atractivos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-red-500/30 transition-colors group relative overflow-hidden"
            >
              {/* Subtle hover glow matching category color */}
              <div
                className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-500`}
              />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-white group-hover:border-white/20 transition-all">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-black/50 border border-white/5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Focus Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 max-w-5xl mx-auto bg-gradient-to-r from-red-950/30 to-black border border-red-900/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
              <TerminalSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-medium">Especialización Actual</h4>
              <p className="text-gray-400 text-sm">Enfocado profundamente en el ecosistema Mobile con Kotlin.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
