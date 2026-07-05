"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function DashboardOverview({
  username,
  avatarUrl,
  bioText,
  uid,
  isPremium,
  viewCount,
  linkCount,
}: {
  username: string;
  avatarUrl: string;
  bioText: string;
  uid: number;
  isPremium: boolean;
  viewCount: number;
  linkCount: number;
}) {
  const { t } = useLanguage();
  const uidLabel = `#${String(uid).padStart(6, "0")}`;

  const stats = [
    { icon: "eye" as const, label: t.overview.viewsLabel, value: viewCount.toLocaleString() },
    { icon: "flag" as const, label: t.overview.uidLabel, value: uidLabel },
    { icon: "link" as const, label: t.overview.linksLabel, value: String(linkCount) },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:flex-row sm:items-center">
        <img
          src={avatarUrl}
          alt={username}
          className="h-16 w-16 rounded-full border border-zinc-800 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-zinc-100">
              {t.overview.welcome}, @{username}
            </h1>
            <Badge variant={isPremium ? "premium" : "free"}>
              {isPremium ? t.settings.premium : t.settings.free}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-zinc-500">{bioText || t.overview.noBio}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/${username}`} target="_blank">
            <Button variant="secondary" size="sm">
              <Icon name="eye" className="h-3.5 w-3.5" />
              {t.dashboard.viewProfile}
            </Button>
          </Link>
          <Link href="/dashboard/editor">
            <Button size="sm">{t.overview.editPage}</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <div className="mb-2 flex items-center gap-2 text-zinc-500">
              <Icon name={stat.icon} className="h-4 w-4" />
              <span className="text-xs">{stat.label}</span>
            </div>
            <p className="font-mono text-3xl font-bold text-zinc-100">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
