"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default function LoginPage() {
  const { t } = useLanguage();

  const handleDiscordLogin = () => {
    // Supabase project isn't provisioned yet — wire this up to
    // supabase.auth.signInWithOAuth({ provider: "discord" }) once env vars exist.
    alert(t.login.notice);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050508] px-6">
      <div className="absolute right-6 top-6">
        <LanguageSwitcher />
      </div>

      <Link href="/" className="mb-8 text-lg font-bold tracking-tight text-white">
        o7<span className="text-violet-400">tag</span>
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
        <h1 className="text-xl font-semibold text-white">{t.login.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">{t.login.subtitle}</p>

        <Button onClick={handleDiscordLogin} size="lg" className="mt-6 w-full">
          <Icon name="discord" className="h-4 w-4" />
          {t.login.button}
        </Button>

        <p className="mt-4 text-xs text-zinc-600">{t.login.notice}</p>
      </div>
    </div>
  );
}
