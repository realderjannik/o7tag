"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 p-0.5 text-xs font-medium",
        className
      )}
    >
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            locale === l ? "bg-zinc-800 text-brand-400" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
