"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { PageData } from "@/types";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { saveEditorPage } from "@/app/(dashboard)/dashboard/editor/actions";
import { BioEditor } from "@/components/editor/BioEditor";
import { LinkEditorList } from "@/components/editor/LinkEditorList";
import { ThemePicker } from "@/components/editor/ThemePicker";
import { AvatarUploader } from "@/components/editor/AvatarUploader";
import { AudioUploader } from "@/components/editor/AudioUploader";
import { BackgroundPicker } from "@/components/editor/BackgroundPicker";
import { EditorPreview } from "@/components/editor/EditorPreview";
import { EditorSection } from "@/components/editor/EditorSection";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function EditorForm({
  pageId,
  initialPage,
}: {
  pageId: string;
  initialPage: PageData;
}) {
  const { t } = useLanguage();
  const [page, setPage] = useState<PageData>(initialPage);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const save = () => {
    setStatus("idle");
    startTransition(async () => {
      const result = await saveEditorPage({
        pageId,
        bioText: page.bioText,
        avatarUrl: page.avatarUrl,
        themeSlug: page.themeId,
        backgroundType: page.backgroundType,
        backgroundValue: page.backgroundValue,
        audioUrl: page.audioUrl,
        links: page.links,
      });
      setStatus(result.error ? "error" : "saved");
      if (!result.error) setTimeout(() => setStatus("idle"), 2500);
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{t.dashboard.editor}</h1>
            <Link
              href={`/${page.username}`}
              target="_blank"
              className="text-xs text-zinc-500 hover:text-brand-500"
            >
              o7tag.com/{page.username} ↗
            </Link>
          </div>
          <Badge variant={page.isPremium ? "premium" : "free"}>
            {page.isPremium ? t.settings.premium : t.settings.free}
          </Badge>
        </div>

        <EditorSection icon="user" title={t.editor.profileSection}>
          <AvatarUploader
            value={page.avatarUrl}
            onChange={(avatarUrl) => setPage({ ...page, avatarUrl })}
          />
          <BioEditor value={page.bioText} onChange={(bioText) => setPage({ ...page, bioText })} />
        </EditorSection>

        <EditorSection icon="palette" title={t.editor.designSection}>
          <ThemePicker
            value={page.themeId}
            onChange={(themeId) => setPage({ ...page, themeId })}
          />
          <BackgroundPicker
            type={page.backgroundType}
            value={page.backgroundValue}
            onChange={(backgroundType, backgroundValue) =>
              setPage({ ...page, backgroundType, backgroundValue })
            }
          />
        </EditorSection>

        <EditorSection icon="volumeOn" title={t.editor.audio}>
          <AudioUploader
            value={page.audioUrl}
            onChange={(audioUrl) => setPage({ ...page, audioUrl })}
          />
        </EditorSection>

        <EditorSection icon="link" title={t.editor.links}>
          <LinkEditorList
            links={page.links}
            isPremium={page.isPremium}
            onChange={(links) => setPage({ ...page, links })}
          />
        </EditorSection>

        <div className="flex items-center gap-3">
          <Button onClick={save} disabled={isPending}>
            {isPending ? "..." : t.editor.save}
          </Button>
          {status === "saved" && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-400">
              <Icon name="eye" className="h-4 w-4" />
              {t.editor.saved}
            </span>
          )}
          {status === "error" && (
            <span className="text-sm text-red-400">Speichern fehlgeschlagen.</span>
          )}
        </div>
      </div>

      <EditorPreview page={page} />
    </div>
  );
}
