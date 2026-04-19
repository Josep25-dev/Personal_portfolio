"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Send } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [activeSection, setActiveSection] = useState("#home");

  const NAV_LINKS = [
    { name: t("home"), href: "#home" },
    { name: t("projects"), href: "#projects" },
    { name: t("skills"), href: "#skills" },
    { name: t("about"), href: "#about" },
    { name: t("experience"), href: "#experience" },
  ];

  useEffect(() => {
    // Simple intersection observer to update active state based on scroll
    const handleScroll = () => {
      // Add contact to the list of sections to check for scroll highlighting
      const allSections = [...NAV_LINKS, { name: t("contact"), href: "#contact" }];
      const sections = allSections.map(link => link.href.substring(1));
      
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = `#${section}`;
            break;
          }
        }
      }
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
         setActiveSection("#home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 px-6 lg:px-12"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        
        {/* Left: Logo and Title */}
        <Link 
          href="#home" 
          className="flex items-center gap-2.5 group w-40" // Fixed width to help centering the middle nav
        >
          <div className="w-10 h-10 shrink-0 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-600/20 transition-colors">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-gray-900 dark:text-white font-medium tracking-wide hidden md:block whitespace-nowrap">
            {t("title")}
          </span>
        </Link>

        {/* Center: Pill Navigation */}
        <nav className="hidden md:flex bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_0_20px_rgba(220,38,38,0.05)] dark:shadow-[0_0_20px_rgba(220,38,38,0.1)] rounded-full p-1.5 items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-red-600/90 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.4)] z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Contact Button & Theme Toggle */}
        <div className="flex items-center justify-end w-40 gap-2"> {/* Fixed width to balance the left side */}
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="#contact"
            onClick={() => setActiveSection("#contact")}
            className={`flex shrink-0 items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeSection === "#contact"
                ? "bg-red-600/90 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                : "bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-black/10 dark:border-white/10 hover:border-red-500/50 dark:hover:border-red-500/50 hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            <span className="hidden sm:block">{t("contact")}</span>
            <Send className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Mobile Navigation Pill (Visible only on small screens) */}
      <div className="flex md:hidden justify-center mt-4">
        <nav className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center overflow-x-auto max-w-full hide-scrollbar">
          {[...NAV_LINKS].map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill-mobile"
                    className="absolute inset-0 bg-red-600/90 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
