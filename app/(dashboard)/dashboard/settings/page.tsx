"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex max-w-lg flex-col gap-8">
      <h1 className="text-2xl font-bold text-zinc-100">{t.settings.title}</h1>

      <section className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="text-sm font-semibold text-zinc-300">{t.settings.account}</h2>
        <div>
          <label className="mb-1.5 block text-xs text-zinc-500">{t.settings.username}</label>
          <Input value="ghost" disabled />
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">{t.settings.plan}</h2>
          <Badge variant="free">{t.settings.free}</Badge>
        </div>
        <p className="text-sm text-zinc-500">{t.settings.customDomain}</p>
        <div className="flex gap-2">
          <Button size="sm">{t.settings.upgrade}</Button>
          <Button size="sm" variant="secondary" disabled>
            {t.settings.manageBilling}
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.03] p-5">
        <h2 className="text-sm font-semibold text-red-300">{t.settings.dangerZone}</h2>
        <Button size="sm" variant="danger" className="w-fit">
          {t.settings.deleteAccount}
        </Button>
      </section>
    </div>
  );
}
