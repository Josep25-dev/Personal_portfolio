"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Coffee, Cpu, Globe2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="py-24 relative bg-white dark:bg-[#050505] transition-colors duration-300 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
      <div className="absolute -left-40 top-40 w-80 h-80 bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 max-w-7xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-zinc-900 group">
              <Image 
                src="/images/profile.jpg"
                alt="Christian Josep"
                fill
                className="object-cover"
              />
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating Badges */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-xl shadow-red-900/10 dark:shadow-red-900/20 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-500">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-lg">{t("badgeTitle")}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t("badgeDesc")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t("headline")}
            </h3>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              <p>{t("p1")}</p>
              <p dangerouslySetInnerHTML={{ __html: t.raw("p2") }} />
              <p>{t("p3")}</p>
            </div>

            {/* Key Traits/Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors shadow-sm dark:shadow-none">
                <Cpu className="w-5 h-5 text-red-600 dark:text-red-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("trait1")}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors shadow-sm dark:shadow-none">
                <Globe2 className="w-5 h-5 text-red-600 dark:text-red-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("trait2")}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors shadow-sm dark:shadow-none">
                <Coffee className="w-5 h-5 text-red-600 dark:text-red-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("trait3")}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
