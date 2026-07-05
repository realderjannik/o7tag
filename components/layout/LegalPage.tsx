"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050508]">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="mb-6 text-3xl font-bold text-white">{title}</h1>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-400">
          {children}
          <p className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs text-amber-400/80">
            {t.legal.placeholder}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
