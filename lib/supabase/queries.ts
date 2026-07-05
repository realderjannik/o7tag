import { createClient } from "@/lib/supabase/server";
import type { PageData } from "@/types";

export async function getPageByUsername(username: string): Promise<PageData | null> {
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("pages")
    .select("*, links(*), themes(slug)")
    .eq("username", username.toLowerCase())
    .maybeSingle();

  if (!page) return null;

  const links = (page.links ?? []) as {
    id: string;
    label: string;
    url: string;
    icon: string | null;
    position: number;
    is_visible: boolean;
  }[];

  return {
    username: page.username,
    displayName: page.username,
    bioText: page.bio_text ?? "",
    avatarUrl: page.avatar_url ?? "",
    themeId: (page.themes as { slug: string } | null)?.slug ?? "midnight",
    backgroundType: page.background_type,
    backgroundValue: page.background_value ?? "",
    audioUrl: page.audio_url,
    discordId: page.discord_id,
    viewCount: page.view_count,
    isPremium: page.is_premium,
    links: links
      .sort((a, b) => a.position - b.position)
      .map((l) => ({
        id: l.id,
        label: l.label,
        url: l.url,
        icon: l.icon ?? undefined,
        position: l.position,
        isVisible: l.is_visible,
      })),
  };
}
