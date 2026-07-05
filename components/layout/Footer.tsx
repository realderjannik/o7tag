"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 sm:flex-row">
        <p>
          {t.home.footerCrafted}{" "}
          <a
            href="https://github.com/realderjannik"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white"
          >
            realderjannik
          </a>
        </p>
        <div className="flex items-center gap-5">
          <Link href="/impressum" className="hover:text-zinc-300">
            {t.footer.impressum}
          </Link>
          <Link href="/tos" className="hover:text-zinc-300">
            {t.footer.tos}
          </Link>
          <Link href="/privacy" className="hover:text-zinc-300">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
