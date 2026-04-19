"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-red-600/5 dark:bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 dark:from-red-500 dark:to-red-800">
              {t("titleHighlight")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder={t("namePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-900 dark:text-white">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-500/50 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 group"
              >
                {t("submit")}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t("socialsTitle")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("socialsDesc")}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:tu-correo@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500 shadow-sm dark:shadow-none transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white font-medium">tu-correo@gmail.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/TuUsuario"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500 shadow-sm dark:shadow-none transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">LinkedIn</p>
                  <p className="text-gray-900 dark:text-white font-medium">/in/TuUsuario</p>
                </div>
              </a>

              <a
                href="https://github.com/TuUsuario"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-500 shadow-sm dark:shadow-none transition-colors">
                  <FaGithub className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">GitHub</p>
                  <p className="text-gray-900 dark:text-white font-medium">/TuUsuario</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 group">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111] flex items-center justify-center text-gray-600 dark:text-gray-400 shadow-sm dark:shadow-none">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("location")}</p>
                  <p className="text-gray-900 dark:text-white font-medium">{t("locationValue")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer / Copyright */}
      <div className="mt-24 pt-8 border-t border-gray-200 dark:border-white/5 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Christian Josep. Todos los derechos reservados.
        </p>
      </div>
    </section>
  );
}
