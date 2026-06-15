"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Send, Home, FolderKanban, Wrench, User, Briefcase } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [activeSection, setActiveSection] = useState("#home");

  const NAV_LINKS = [
    { name: t("home"), href: "#home", icon: Home },
    { name: t("projects"), href: "#projects", icon: FolderKanban },
    { name: t("skills"), href: "#skills", icon: Wrench },
    { name: t("about"), href: "#about", icon: User },
    { name: t("experience"), href: "#experience", icon: Briefcase },
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
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 px-6 lg:px-12 pointer-events-none"
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto pointer-events-auto">
        
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
              <a
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
              </a>
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
      </motion.header>

      {/* Mobile Navigation Dock (Visible only on small screens) */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center md:hidden pointer-events-none"
      >
        <nav className="bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(220,38,38,0.15)] rounded-full p-2 flex items-center justify-between pointer-events-auto w-full max-w-[400px]">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            const Icon = link.icon;
            
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? "text-white w-auto px-5" 
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white w-12"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill-mobile"
                    className="absolute inset-0 bg-red-600/90 rounded-full z-[-1] shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "mr-2" : ""}`} />
                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {link.name}
                  </motion.span>
                )}
              </a>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}
