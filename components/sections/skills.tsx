"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  LayoutTemplate,
  Wrench,
  TerminalSquare,
  Users
} from "lucide-react";
import { useTranslations } from "next-intl";

// Categorías
const SKILL_CATEGORIES = [
  {
    id: "frontend",
    titleKey: "frontend",
    icon: <LayoutTemplate className="w-6 h-6" />,
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    color: "from-red-500 to-orange-500",
  },
  {
    id: "mobile",
    titleKey: "mobile",
    icon: <Smartphone className="w-6 h-6" />,
    skills: ["Kotlin", "Jetpack Compose", "Clean Architecture"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "tools",
    titleKey: "tools",
    icon: <Wrench className="w-6 h-6" />,
    skills: [
      "Git / GitHub",
      "Diseño UI/UX (Figma)",
      "Docker",
      "Mysql",
      "MongoDB",
    ],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "softSkills",
    titleKey: "softSkills",
    icon: <Users className="w-6 h-6" />,
    skills: [
      "Trabajo en Equipo",
      "Adaptabilidad",
      "Resolución de Problemas",
      "Comunicación Efectiva",
      "Aprendizaje Continuo"
    ],
    color: "from-purple-500 to-pink-500",
  },
];

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="py-24 relative bg-gray-50 dark:bg-black transition-colors duration-300 overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")} <span className="text-red-600 dark:text-red-500">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("description")}
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
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors group relative overflow-hidden shadow-sm dark:shadow-none"
            >
              {/* Subtle hover glow matching category color */}
              <div
                className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-500`}
              />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white group-hover:border-gray-300 dark:group-hover:border-white/20 transition-all">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t(`categories.${category.titleKey}`)}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-red-500/50 dark:hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-default"
                  >
                    {category.id === "softSkills" ? t(`soft.${skill}`) : skill}
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
          className="mt-12 max-w-5xl mx-auto bg-gradient-to-r from-red-50/50 to-white dark:from-red-950/30 dark:to-black border border-red-200 dark:border-red-900/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-none"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-500 animate-pulse">
              <TerminalSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-medium">{t("currentFocus")}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{t("currentFocusDesc")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
