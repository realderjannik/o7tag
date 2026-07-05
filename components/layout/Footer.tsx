"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Feather Icons "heart" path (MIT licensed, feathericons.com) — same icon
// o7overlay.com renders via data-feather="heart" in its footer.
function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-brand-500"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 sm:flex-row">
        <p className="flex items-center gap-1.5">
          Made with <HeartIcon /> bei{" "}
          <a
            href="https://github.com/realderjannik"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-brand-500"
          >
            DerJannik
          </a>
        </p>
        <div className="flex items-center gap-5">
          <Link href="/impressum" className="hover:text-brand-500">
            {t.footer.impressum}
          </Link>
          <Link href="/tos" className="hover:text-brand-500">
            {t.footer.tos}
          </Link>
          <Link href="/privacy" className="hover:text-brand-500">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
