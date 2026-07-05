"use client";

import { useRef } from "react";
import type { BackgroundType } from "@/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function BackgroundPicker({
  type,
  value,
  onChange,
}: {
  type: BackgroundType;
  value: string;
  onChange: (type: BackgroundType, value: string) => void;
}) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const options: { id: BackgroundType; label: string; accept?: string }[] = [
    { id: "color", label: t.editor.backgroundColor },
    { id: "image", label: t.editor.backgroundImage, accept: "image/*" },
    { id: "video", label: t.editor.backgroundVideo, accept: "video/*" },
  ];

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    onChange(type, URL.createObjectURL(file));
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-300">
        {t.editor.background}
      </label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id, opt.id === "color" ? "" : value)}
            className={cn(
              "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
              type === opt.id
                ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                : "border-white/10 text-zinc-400 hover:border-white/20"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {type !== "color" && (
        <div className="mt-2.5 flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept={options.find((o) => o.id === type)?.accept}
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            {type === "image" ? t.editor.backgroundImage : t.editor.backgroundVideo}
          </Button>
          {value && <span className="truncate text-xs text-zinc-500">✓ uploaded</span>}
        </div>
      )}
    </div>
  );
}
