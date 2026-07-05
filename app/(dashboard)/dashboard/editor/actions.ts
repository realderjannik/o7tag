"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BackgroundType, LinkItem } from "@/types";

export interface SaveEditorPageInput {
  pageId: string;
  bioText: string;
  avatarUrl: string;
  themeSlug: string;
  backgroundType: BackgroundType;
  backgroundValue: string;
  audioUrl: string | null;
  links: LinkItem[];
}

export interface SaveEditorPageResult {
  error: string | null;
}

// blob: object URLs only exist in the browser tab that created them — they
// can't be persisted server-side without real Supabase Storage uploads
// (not wired up yet). Values like that are dropped so we keep whatever
// was already saved instead of writing a dead link into the database.
function isPersistable(value: string | null | undefined): value is string {
  return !!value && !value.startsWith("blob:");
}

export async function saveEditorPage(
  input: SaveEditorPageInput
): Promise<SaveEditorPageResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "not_authenticated" };
  }

  const { data: theme, error: themeError } = await supabase
    .from("themes")
    .select("id")
    .eq("slug", input.themeSlug)
    .single();

  if (themeError || !theme) {
    return { error: "invalid_theme" };
  }

  const update: Record<string, unknown> = {
    bio_text: input.bioText || null,
    theme_id: theme.id,
    background_type: input.backgroundType,
    updated_at: new Date().toISOString(),
  };

  if (isPersistable(input.avatarUrl)) update.avatar_url = input.avatarUrl;
  if (input.backgroundType === "color") {
    update.background_value = null;
  } else if (isPersistable(input.backgroundValue)) {
    update.background_value = input.backgroundValue;
  }
  if (input.audioUrl === null) update.audio_url = null;
  else if (isPersistable(input.audioUrl)) update.audio_url = input.audioUrl;

  const { error: updateError } = await supabase
    .from("pages")
    .update(update)
    .eq("id", input.pageId)
    .eq("user_id", user.id);

  if (updateError) {
    return { error: updateError.message };
  }

  const { error: deleteError } = await supabase
    .from("links")
    .delete()
    .eq("page_id", input.pageId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  const validLinks = input.links.filter((l) => l.label.trim() && l.url.trim());

  if (validLinks.length > 0) {
    const { error: linksError } = await supabase.from("links").insert(
      validLinks.map((link, index) => ({
        page_id: input.pageId,
        label: link.label.trim(),
        url: link.url.trim(),
        icon: link.icon ?? null,
        position: index,
        is_visible: link.isVisible,
      }))
    );
    if (linksError) {
      return { error: linksError.message };
    }
  }

  revalidatePath("/dashboard/editor");
  return { error: null };
}
