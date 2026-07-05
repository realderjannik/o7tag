"use client";

import { Textarea } from "@/components/ui/Textarea";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const MAX_LENGTH = 160;

export function BioEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-300">{t.editor.bio}</label>
      <Textarea
        rows={3}
        maxLength={MAX_LENGTH}
        placeholder={t.editor.bioPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="mt-1 text-right text-xs text-zinc-600">
        {value.length}/{MAX_LENGTH}
      </p>
    </div>
  );
}
