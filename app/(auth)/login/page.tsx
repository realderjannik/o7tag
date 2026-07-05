"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Icon } from "@/components/ui/Icon";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Mode = "login" | "register";

export default function LoginPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [discordLoading, setDiscordLoading] = useState(false);

  const isRegister = mode === "register";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get("error_description") ?? params.get("error");
    if (oauthError) setError(oauthError);
  }, []);

  const handleDiscordAuth = async () => {
    setError(null);
    setDiscordLoading(true);

    // If the redirect to Discord hasn't happened after a few seconds
    // (blocked navigation, network hiccup), stop showing a stuck spinner.
    const stuckTimeout = setTimeout(() => setDiscordLoading(false), 6000);

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });

    if (oauthError) {
      clearTimeout(stuckTimeout);
      setError(oauthError.message);
      setDiscordLoading(false);
    }
    // On success the browser navigates to Discord automatically.
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!EMAIL_PATTERN.test(email)) {
      setError(t.login.errorEmailInvalid);
      return;
    }
    if (password.length < 8) {
      setError(t.login.errorPasswordShort);
      return;
    }
    if (isRegister && password !== confirmPassword) {
      setError(t.login.errorPasswordMismatch);
      return;
    }

    // Email/password auth isn't wired up yet — wire this up to
    // supabase.auth.signInWithPassword / signUp next.
    alert(t.login.noticeEmail);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6">
      <div className="absolute right-6 top-6">
        <LanguageSwitcher />
      </div>

      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-brand-600/10">
          <Image src="/brand/o7-logo.png" alt="o7tag" width={22} height={22} />
        </span>
        <span className="text-lg font-bold tracking-tight text-zinc-100">
          o7<span className="text-brand-500">tag</span>
        </span>
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-zinc-100">
            {isRegister ? t.login.titleRegister : t.login.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {isRegister ? t.login.subtitleRegister : t.login.subtitle}
          </p>
        </div>

        <Button
          onClick={handleDiscordAuth}
          size="lg"
          className="mt-6 w-full"
          disabled={discordLoading}
        >
          <Icon name="discord" className="h-4 w-4" />
          {discordLoading
            ? "..."
            : isRegister
              ? t.login.discordButtonRegister
              : t.login.discordButton}
        </Button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs uppercase tracking-wide text-zinc-600">{t.login.or}</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">{t.login.email}</label>
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">{t.login.password}</label>
            <Input
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegister && (
            <div>
              <label className="mb-1.5 block text-xs text-zinc-500">
                {t.login.confirmPassword}
              </label>
              <Input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button type="submit" variant="secondary" className="mt-1 w-full">
            {isRegister ? t.login.registerButton : t.login.loginButton}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-zinc-500">
          {isRegister ? t.login.switchToLogin : t.login.switchToRegister}{" "}
          <button
            onClick={() => switchMode(isRegister ? "login" : "register")}
            className="font-medium text-brand-500 hover:text-brand-400"
          >
            {isRegister ? t.login.switchToLoginLink : t.login.switchToRegisterLink}
          </button>
        </p>
      </div>

      <p className="mt-4 max-w-sm text-center text-xs text-zinc-600">{t.login.noticeEmail}</p>
    </div>
  );
}
