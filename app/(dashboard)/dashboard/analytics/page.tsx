"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function AnalyticsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-zinc-100">{t.analytics.title}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-2 flex items-center gap-2 text-zinc-500">
            <Icon name="eye" className="h-4 w-4" />
            <span className="text-xs">{t.analytics.totalViews}</span>
          </div>
          <p className="text-3xl font-bold text-zinc-100">0</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-2 flex items-center gap-2 text-zinc-500">
            <Icon name="link" className="h-4 w-4" />
            <span className="text-xs">Link clicks</span>
          </div>
          <p className="text-3xl font-bold text-zinc-100">0</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-2 flex items-center gap-2 text-zinc-500">
            <Icon name="eye" className="h-4 w-4" />
            <span className="text-xs">Today</span>
          </div>
          <p className="text-3xl font-bold text-zinc-100">0</p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 rounded-xl border border-brand-500/20 bg-brand-500/[0.04] p-5">
        <p className="text-sm text-zinc-300">{t.analytics.premiumGate}</p>
        <Button size="sm">{t.analytics.upgrade}</Button>
      </div>
    </div>
  );
}
