"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { FaGithub, FaLinkedin, FaReact, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000); // Responsive amount
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(220, 38, 38, 0.8)"; // Red particles

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(220, 38, 38, ${1 - distance / 120})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Slight attraction
          p.vx += dx * 0.0001;
          p.vy += dy * 0.0001;
        }

        // Add some friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Restore random movement slowly
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    canvas.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      {/* Interactive Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Top light rays effect (simulated with gradients) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-red-900/20 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between mt-20 gap-12 lg:gap-8">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4"
          >
            <span className="text-2xl md:text-3xl text-gray-500 dark:text-gray-400 font-medium block mb-2">{t("greeting")}</span>
            <span className="block mb-2">{t("name")}</span>
            <span className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 dark:from-red-500 dark:to-red-800">
              {t("profession")} <br className="hidden lg:block" /> {t("specialty")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-light"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="#projects"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2"
            >
              {t("ctaProjects")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex w-full sm:w-auto gap-4">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-medium transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:border-red-500/30 dark:hover:border-red-500/30"
                title="Descargar CV"
              >
                CV
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: Image Content & Socials */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          {/* Photo */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full p-2 bg-gradient-to-tr from-red-600 to-black/0 dark:from-red-500/50 dark:to-transparent">
            {/* Floating Tech Icons */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-[10%] left-[-5%] md:left-[-10%] z-20 bg-white dark:bg-zinc-900 p-3 rounded-full shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center"
            >
              <FaReact className="w-6 h-6 md:w-8 md:h-8 text-[#61DAFB]" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-[15%] left-[-2%] md:left-[-5%] z-20 bg-white dark:bg-zinc-900 p-3 rounded-full shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center"
            >
              <FaJs className="w-5 h-5 md:w-7 md:h-7 text-[#F7DF1E]" />
            </motion.div>

            <motion.div
              animate={{ y: [-12, 8, -12] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute top-[15%] right-[-5%] md:right-[-10%] z-20 bg-white dark:bg-zinc-900 p-3 rounded-full shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center"
            >
              <FaHtml5 className="w-6 h-6 md:w-8 md:h-8 text-[#E34F26]" />
            </motion.div>

            <motion.div
              animate={{ y: [8, -12, 8] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              className="absolute bottom-[10%] right-[-2%] md:right-[-5%] z-20 bg-white dark:bg-zinc-900 p-3 rounded-full shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center"
            >
              <FaCss3Alt className="w-6 h-6 md:w-8 md:h-8 text-[#1572B6]" />
            </motion.div>

            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-zinc-900 overflow-hidden border-4 border-white dark:border-[#050505] flex items-center justify-center relative z-10">
              <Image 
                src="/images/profile.jpg"
                alt="Christian Josep"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-full bg-red-600/20 dark:bg-red-500/20 blur-[50px] -z-10" />
          </div>

          {/* Social Icons (Moved here) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-4 w-full"
          >
            <a
              href="https://github.com/Josep25-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all border border-transparent hover:border-red-500/30 shadow-sm dark:shadow-none"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-josep-toledo-9463a4404"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all border border-transparent hover:border-red-500/30 shadow-sm dark:shadow-none"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:josep.toledo.dev@gmail.com"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5 hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all border border-transparent hover:border-red-500/30 shadow-sm dark:shadow-none"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Glowing Horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[150%] h-[1000px] rounded-[100%] border-[2px] border-red-500/30 bg-black shadow-[0_-50px_100px_rgba(220,38,38,0.15)] backdrop-blur-3xl" />
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[100%] h-[10px] bg-red-500/50 blur-[20px]" />
      </div>
    </section>
  );
}
