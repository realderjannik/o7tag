"use client";

import type { LinkItem } from "@/types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const FREE_LINK_LIMIT = 5;

let nextId = 100;

export function LinkEditorList({
  links,
  isPremium,
  onChange,
}: {
  links: LinkItem[];
  isPremium: boolean;
  onChange: (links: LinkItem[]) => void;
}) {
  const { t } = useLanguage();
  const sorted = [...links].sort((a, b) => a.position - b.position);
  const atLimit = !isPremium && links.length >= FREE_LINK_LIMIT;

  const update = (id: string, patch: Partial<LinkItem>) => {
    onChange(links.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const remove = (id: string) => {
    onChange(links.filter((l) => l.id !== id));
  };

  const move = (id: string, direction: -1 | 1) => {
    const idx = sorted.findIndex((l) => l.id === id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const reordered = [...sorted];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
    onChange(reordered.map((l, i) => ({ ...l, position: i })));
  };

  const add = () => {
    if (atLimit) return;
    const newLink: LinkItem = {
      id: `new-${nextId++}`,
      label: "",
      url: "",
      icon: "link",
      position: links.length,
      isVisible: true,
    };
    onChange([...links, newLink]);
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">{t.editor.links}</label>
        <span className="text-xs text-zinc-600">
          {links.length}
          {!isPremium && `/${FREE_LINK_LIMIT}`}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {sorted.map((link, idx) => (
          <div
            key={link.id}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2.5"
          >
            <div className="flex flex-col">
              <button
                onClick={() => move(link.id, -1)}
                disabled={idx === 0}
                className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20"
                aria-label="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => move(link.id, 1)}
                disabled={idx === sorted.length - 1}
                className="text-zinc-600 hover:text-zinc-300 disabled:opacity-20"
                aria-label="Move down"
              >
                ▼
              </button>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2">
              <Input
                placeholder={t.editor.linkLabel}
                value={link.label}
                onChange={(e) => update(link.id, { label: e.target.value })}
              />
              <Input
                placeholder={t.editor.linkUrl}
                value={link.url}
                onChange={(e) => update(link.id, { url: e.target.value })}
              />
            </div>
            <button
              onClick={() => remove(link.id)}
              className="shrink-0 rounded-md p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
              aria-label="Remove link"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <Button variant="secondary" size="sm" className="mt-3" onClick={add} disabled={atLimit}>
        <Icon name="link" className="h-3.5 w-3.5" />
        {t.editor.addLink}
      </Button>

      {atLimit && <p className="mt-2 text-xs text-amber-400/80">{t.editor.freeLinkLimit}</p>}
    </div>
  );
}
