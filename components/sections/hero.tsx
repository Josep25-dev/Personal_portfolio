"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let mouse = { x: -1000, y: -1000 };

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
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Terminal className="w-4 h-4" />
          <span>Software Developer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white tracking-tight max-w-4xl leading-[1.1]"
        >
          Construyendo el futuro a través del <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 dark:from-red-500 dark:to-red-800">
            Código y la Innovación
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl font-light"
        >
          ¡Hola! Soy Josep, próximo Ingeniero en Software. Me apasiona resolver problemas complejos, aprender nuevas tecnologías y crear aplicaciones web modernas, eficientes y escalables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2"
          >
            Ver mis proyectos
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-medium transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:border-red-500/30 dark:hover:border-red-500/30"
          >
            Contactar
          </Link>
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
