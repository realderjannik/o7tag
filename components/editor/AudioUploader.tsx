"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

export function AudioUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    onChange(URL.createObjectURL(file));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-300">{t.editor.audio}</label>
      <div className="flex flex-wrap items-center gap-3">
        {value && <audio src={value} controls className="h-9 max-w-[220px]" />}
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
          {t.editor.uploadAudio}
        </Button>
        {value && (
          <Button variant="ghost" size="sm" onClick={() => onChange(null)}>
            {t.editor.removeAudio}
          </Button>
        )}
      </div>
    </div>
  );
}
