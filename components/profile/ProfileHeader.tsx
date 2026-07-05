import type { PageData, Theme } from "@/types";
import { DiscordPresenceBadge } from "./DiscordPresenceBadge";
import { ViewCounter } from "./ViewCounter";

export function ProfileHeader({ page, theme }: { page: PageData; theme: Theme }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div
        className="relative rounded-full p-1"
        style={{ boxShadow: `0 0 32px ${theme.accentSoft}` }}
      >
        <img
          src={page.avatarUrl}
          alt={page.displayName}
          className="h-24 w-24 rounded-full border-2 object-cover"
          style={{ borderColor: theme.accent }}
        />
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">@{page.displayName}</h1>
        {page.bioText && (
          <p className="mx-auto mt-1.5 max-w-xs text-sm text-zinc-400">{page.bioText}</p>
        )}
      </div>

      {page.discordId && <DiscordPresenceBadge discordId={page.discordId} theme={theme} />}

      <ViewCounter count={page.viewCount} />
    </div>
  );
}
