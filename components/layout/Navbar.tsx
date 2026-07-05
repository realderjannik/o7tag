"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-brand-600/10">
            <Image src="/brand/o7-logo.png" alt="o7tag" width={26} height={26} />
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-100">
            o7<span className="text-brand-500">tag</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-zinc-400 transition-colors hover:text-brand-500">
            {t.nav.features}
          </a>
          <a href="#pricing" className="text-sm text-zinc-400 transition-colors hover:text-brand-500">
            {t.nav.pricing}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link href="/login">
            <Button size="sm">{t.nav.login}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
