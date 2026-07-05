"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDiscordIdentity } from "@/lib/supabase/discord-identity";
import { isValidUsername } from "@/lib/utils/slug";

export interface OnboardingState {
  error: string | null;
}

export async function completeOnboarding(
  _prevState: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const identity = getDiscordIdentity(user);
  if (!identity) {
    return { error: "Discord-Profil konnte nicht gelesen werden." };
  }

  const username = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const bioText = String(formData.get("bio") ?? "").trim();
  const submittedAvatar = String(formData.get("avatarUrl") ?? "");
  // blob: URLs only exist in the submitting browser tab — not persistable
  // server-side without real Storage uploads, so fall back to the Discord one.
  const avatarUrl = submittedAvatar.startsWith("blob:")
    ? identity.avatarUrl
    : submittedAvatar || identity.avatarUrl;

  if (!isValidUsername(username)) {
    return {
      error: "Ungültiger Username (3-20 Zeichen, a-z/0-9/_, keine reservierten Namen).",
    };
  }

  const { data: theme, error: themeError } = await supabase
    .from("themes")
    .select("id")
    .order("sort_order", { ascending: true })
    .limit(1)
    .single();

  if (themeError || !theme) {
    return { error: "Kein Theme gefunden — wurde die Migration ausgeführt?" };
  }

  const { error: userError } = await supabase.from("users").upsert({
    id: user.id,
    discord_id: identity.discordId,
    discord_username: identity.username,
  });

  if (userError) {
    return { error: userError.message };
  }

  const { error: pageError } = await supabase.from("pages").insert({
    user_id: user.id,
    username,
    discord_id: identity.discordId,
    theme_id: theme.id,
    bio_text: bioText || null,
    avatar_url: avatarUrl,
  });

  if (pageError) {
    if (pageError.code === "23505") {
      return { error: "Dieser Username ist bereits vergeben." };
    }
    return { error: pageError.message };
  }

  redirect("/dashboard/editor");
}
