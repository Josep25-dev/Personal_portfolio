"use client";

import React from "react";
import { motion } from "framer-motion";

// Datos de la línea de tiempo extraídos de tu CV
const TIMELINE_ITEMS = [
  {
    id: 1,
    title: "Desarrollador Frontend (Web) - WORKLI",
    company: "Desarrollo freelance",
    date: "Febrero 2026 - Actualmente",
    description: "Desarrollo front-end de la plataforma SaaS Workli utilizando Next.js y TypeScript. Implementación de arquitectura modular con Clerk para autenticación y next-intl para multi-idioma. Construcción de módulos interactivos de control financiero con Tailwind CSS y SortableJS."
  },
  {
    id: 2,
    title: "Desarrollador Android Frontend - UP-RIVALS",
    company: "Universidad Politécnica de Chiapas",
    date: "Septiembre 2025 - Diciembre 2025",
    description: "Desarrollo del frontend nativo de la aplicación móvil de gestión de torneos utilizando Kotlin y Jetpack Compose. Implementación de Arquitectura Limpia (Clean Architecture) e Inyección de Dependencias. Conexión end-to-end con servicios backend."
  },
  {
    id: 3,
    title: "Desarrollador Frontend - PROJECT SPARK",
    company: "DESIGNED BY WE",
    date: "Diciembre 2024 - Febrero 2025",
    description: "Desarrollé interfaces de usuario modernas y responsivas utilizando React.js y Shadcn UI. Implementé la lógica de consumo de APIs REST para el renderizado dinámico de componentes y gestioné dependencias mediante npm."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-[#050505]">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experiencia y <span className="text-red-500">Educación</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Un recorrido por mis proyectos académicos, prácticas y mi evolución como desarrollador.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Línea vertical central (visible en pantallas medianas o más grandes) */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600/50 via-red-900/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Punto en la línea de tiempo */}
                  <div className="absolute left-[11px] md:left-1/2 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.8)] md:-translate-x-1/2 mt-2 md:mt-0 z-10" />

                  {/* Contenido (alternando izquierda/derecha en desktop) */}
                  <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-500/30 hover:bg-white/10 transition-colors">
                      <span className="inline-block text-red-400 text-sm font-semibold mb-2 bg-red-500/10 px-3 py-1 rounded-full">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-medium text-gray-400 mb-3 pb-3 border-b border-white/5">
                        {item.company}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
