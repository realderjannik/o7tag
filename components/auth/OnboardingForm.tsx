"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { completeOnboarding, type OnboardingState } from "@/app/(auth)/onboarding/actions";
import { createClient } from "@/lib/supabase/client";
import { isValidUsername } from "@/lib/utils/slug";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type UsernameStatus = "idle" | "invalid" | "checking" | "available" | "taken";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { t } = useLanguage();
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={disabled || pending}>
      {pending ? t.onboarding.submitting : t.onboarding.submit}
    </Button>
  );
}

export function OnboardingForm({
  suggestedUsername,
  avatarUrl,
  suggestedBio,
}: {
  suggestedUsername: string;
  avatarUrl: string | null;
  suggestedBio: string;
}) {
  const { t } = useLanguage();
  const initialState: OnboardingState = { error: null };
  const [state, formAction] = useActionState(completeOnboarding, initialState);

  const [username, setUsername] = useState(suggestedUsername.toLowerCase().replace(/[^a-z0-9_]/g, ""));
  const [bio, setBio] = useState(suggestedBio);
  const [avatarPreview, setAvatarPreview] = useState(avatarUrl ?? "");
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const checkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (checkTimer.current) clearTimeout(checkTimer.current);

    if (!isValidUsername(username)) {
      setUsernameStatus(username.length > 0 ? "invalid" : "idle");
      return;
    }

    setUsernameStatus("checking");
    checkTimer.current = setTimeout(async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("pages")
        .select("id")
        .eq("username", username)
        .maybeSingle();
      setUsernameStatus(data ? "taken" : "available");
    }, 400);

    return () => {
      if (checkTimer.current) clearTimeout(checkTimer.current);
    };
  }, [username]);

  const handleAvatarFile = (file: File | undefined) => {
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const canSubmit = usernameStatus === "available";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-zinc-100">{t.onboarding.title}</h1>
          <p className="mt-2 text-sm text-zinc-500">{t.onboarding.subtitle}</p>
        </div>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="avatarUrl" value={avatarPreview} />

          <div className="flex flex-col items-center gap-2">
            <img
              src={avatarPreview}
              alt=""
              className="h-20 w-20 rounded-full border border-zinc-800 object-cover"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleAvatarFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-medium text-brand-500 hover:text-brand-400"
            >
              {t.editor.uploadAvatar}
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">
              {t.onboarding.usernameLabel}
            </label>
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 focus-within:border-brand-500/60">
              <span className="pl-3.5 text-sm text-zinc-600">o7tag.com/</span>
              <input
                name="username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))
                }
                className="w-full bg-transparent py-2.5 pr-3.5 text-sm text-zinc-100 outline-none"
                required
              />
            </div>
            <p
              className={
                "mt-1.5 text-xs " +
                (usernameStatus === "available"
                  ? "text-emerald-400"
                  : usernameStatus === "taken" || usernameStatus === "invalid"
                    ? "text-red-400"
                    : "text-zinc-600")
              }
            >
              {usernameStatus === "checking" && t.onboarding.usernameChecking}
              {usernameStatus === "available" && t.onboarding.usernameAvailable}
              {usernameStatus === "taken" && t.onboarding.usernameTaken}
              {usernameStatus === "invalid" && "3-20 Zeichen: a-z, 0-9, _"}
              {usernameStatus === "idle" && t.onboarding.usernameHint}
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">{t.editor.bio}</label>
            <Textarea
              name="bio"
              rows={3}
              maxLength={160}
              placeholder={t.editor.bioPlaceholder}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {suggestedBio && (
              <p className="mt-1 text-xs text-zinc-600">{t.onboarding.bioFromDiscord}</p>
            )}
          </div>

          {state.error && <p className="text-xs text-red-400">{state.error}</p>}

          <SubmitButton disabled={!canSubmit} />
        </form>
      </div>
    </div>
  );
}
