"use client";

import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";

export function AvatarUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-300">{t.editor.avatar}</label>
      <div className="flex items-center gap-4">
        <img src={value} alt="" className="h-16 w-16 rounded-full border border-zinc-800 object-cover" />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
          {t.editor.uploadAvatar}
        </Button>
      </div>
    </div>
  );
}
