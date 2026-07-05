"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/ui/Icon";

export function DashboardSidebar({ username }: { username: string }) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const items = [
    { href: "/dashboard/editor", label: t.dashboard.editor, icon: "link" as const },
    { href: "/dashboard/analytics", label: t.dashboard.analytics, icon: "eye" as const },
    { href: "/dashboard/settings", label: t.dashboard.settings, icon: "flag" as const },
  ];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-[#08080c] p-4">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2">
        <span className="text-lg font-bold tracking-tight text-white">
          o7<span className="text-violet-400">tag</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-violet-600/15 text-violet-300"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
        <Link
          href={`/${username}`}
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white"
        >
          <Icon name="eye" className="h-4 w-4" />
          {t.dashboard.viewProfile}
        </Link>
        <LanguageSwitcher />
      </div>
    </aside>
  );
}
