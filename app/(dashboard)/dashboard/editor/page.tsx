import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditorForm } from "@/components/editor/EditorForm";
import type { PageData } from "@/types";

export default async function EditorPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: userRow }, { data: page }, { data: themes }] = await Promise.all([
    supabase.from("users").select("is_premium").eq("id", user.id).single(),
    supabase.from("pages").select("*").eq("user_id", user.id).single(),
    supabase.from("themes").select("id, slug"),
  ]);

  if (!page) {
    redirect("/onboarding");
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("page_id", page.id)
    .order("position", { ascending: true });

  const themeSlug = themes?.find((t) => t.id === page.theme_id)?.slug ?? "midnight";

  const initialPage: PageData = {
    username: page.username,
    displayName: page.username,
    bioText: page.bio_text ?? "",
    avatarUrl: page.avatar_url ?? "",
    themeId: themeSlug,
    backgroundType: page.background_type,
    backgroundValue: page.background_value ?? "",
    audioUrl: page.audio_url,
    discordId: page.discord_id,
    viewCount: page.view_count,
    isPremium: userRow?.is_premium ?? false,
    links: (links ?? []).map((l) => ({
      id: l.id,
      label: l.label,
      url: l.url,
      icon: l.icon ?? undefined,
      position: l.position,
      isVisible: l.is_visible,
    })),
  };

  return <EditorForm pageId={page.id} initialPage={initialPage} />;
}
