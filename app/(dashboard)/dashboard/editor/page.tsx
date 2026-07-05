"use client";

import { useEffect, useState } from "react";
import type { PageData } from "@/types";
import { DEFAULT_EDITOR_PAGE } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { BioEditor } from "@/components/editor/BioEditor";
import { LinkEditorList } from "@/components/editor/LinkEditorList";
import { ThemePicker } from "@/components/editor/ThemePicker";
import { AvatarUploader } from "@/components/editor/AvatarUploader";
import { AudioUploader } from "@/components/editor/AudioUploader";
import { BackgroundPicker } from "@/components/editor/BackgroundPicker";
import { EditorPreview } from "@/components/editor/EditorPreview";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const STORAGE_KEY = "o7tag-editor-page";

export default function EditorPage() {
  const { t } = useLanguage();
  const [page, setPage] = useState<PageData>(DEFAULT_EDITOR_PAGE);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPage(JSON.parse(stored));
      } catch {
        // ignore malformed local demo state
      }
    }
  }, []);

  const save = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(page));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-100">{t.dashboard.editor}</h1>
          <Badge variant={page.isPremium ? "premium" : "free"}>
            {page.isPremium ? t.settings.premium : t.settings.free}
          </Badge>
        </div>

        <BioEditor value={page.bioText} onChange={(bioText) => setPage({ ...page, bioText })} />

        <AvatarUploader
          value={page.avatarUrl}
          onChange={(avatarUrl) => setPage({ ...page, avatarUrl })}
        />

        <BackgroundPicker
          type={page.backgroundType}
          value={page.backgroundValue}
          onChange={(backgroundType, backgroundValue) =>
            setPage({ ...page, backgroundType, backgroundValue })
          }
        />

        <AudioUploader
          value={page.audioUrl}
          onChange={(audioUrl) => setPage({ ...page, audioUrl })}
        />

        <ThemePicker value={page.themeId} onChange={(themeId) => setPage({ ...page, themeId })} />

        <LinkEditorList
          links={page.links}
          isPremium={page.isPremium}
          onChange={(links) => setPage({ ...page, links })}
        />

        <div className="flex items-center gap-3">
          <Button onClick={save}>{t.editor.save}</Button>
          {justSaved && <span className="text-sm text-emerald-400">{t.editor.saved}</span>}
        </div>
      </div>

      <EditorPreview page={page} />
    </div>
  );
}
