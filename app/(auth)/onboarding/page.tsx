import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getDiscordIdentity } from "@/lib/supabase/discord-identity";
import { fetchDiscordPresence } from "@/lib/discord-lanyard/lanyard";
import { OnboardingForm } from "@/components/auth/OnboardingForm";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: existingPage } = await supabase
    .from("pages")
    .select("username")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingPage) {
    redirect("/dashboard/editor");
  }

  const identity = getDiscordIdentity(user);
  if (!identity) {
    redirect("/login?error=discord_identity_missing");
  }

  // Best-effort: only succeeds if this Discord account is visible to
  // Lanyard (member of a Lanyard-monitored server). Empty otherwise.
  const presence = await fetchDiscordPresence(identity.discordId);
  const customStatus = presence?.activities.find((a) => a.type === 4)?.state ?? "";

  return (
    <OnboardingForm
      suggestedUsername={identity.username}
      avatarUrl={identity.avatarUrl}
      suggestedBio={customStatus}
    />
  );
}
