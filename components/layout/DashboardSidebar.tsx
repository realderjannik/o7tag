"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { createClient } from "@/lib/supabase/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils/cn";
import { Icon } from "@/components/ui/Icon";

export function DashboardSidebar({ username }: { username: string }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const items = [
    { href: "/dashboard/editor", label: t.dashboard.editor, icon: "link" as const },
    { href: "/dashboard/analytics", label: t.dashboard.analytics, icon: "eye" as const },
    { href: "/dashboard/settings", label: t.dashboard.settings, icon: "flag" as const },
  ];

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-brand-600/10">
          <Image src="/brand/o7-logo.png" alt="o7tag" width={18} height={18} />
        </span>
        <span className="text-lg font-bold tracking-tight text-zinc-100">
          o7<span className="text-brand-500">tag</span>
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
                  ? "bg-brand-500/15 text-brand-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              )}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t border-zinc-800 pt-4">
        <Link
          href={`/${username}`}
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
        >
          <Icon name="eye" className="h-4 w-4" />
          {t.dashboard.viewProfile}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-red-400"
        >
          <Icon name="logout" className="h-4 w-4" />
          {t.dashboard.logout}
        </button>
        <LanguageSwitcher />
      </div>
    </aside>
  );
}
