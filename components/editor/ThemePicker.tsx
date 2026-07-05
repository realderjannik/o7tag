"use client";

import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ThemePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (themeId: string) => void;
}) {
  const { t } = useLanguage();

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-300">{t.editor.theme}</label>
      <div className="grid grid-cols-4 gap-2.5">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-colors",
              value === theme.id ? "border-brand-500" : "border-zinc-800 hover:border-zinc-700"
            )}
          >
            <span
              className="h-8 w-full rounded-md"
              style={{
                background: `linear-gradient(135deg, ${theme.bgFrom}, ${theme.bgTo})`,
                boxShadow: `inset 0 0 12px ${theme.accentSoft}`,
              }}
            />
            <span className="text-[11px] text-zinc-400">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
