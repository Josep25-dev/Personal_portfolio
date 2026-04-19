"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
      aria-label="Toggle language"
      title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Languages className="w-[1.2rem] h-[1.2rem]" />
      <span className="absolute -bottom-3 text-[9px] font-bold opacity-0 hover:opacity-100 transition-opacity">
        {locale === "es" ? "EN" : "ES"}
      </span>
    </button>
  );
}