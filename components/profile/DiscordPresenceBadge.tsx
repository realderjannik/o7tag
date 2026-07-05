"use client";

import { useEffect, useState } from "react";
import {
  fetchDiscordPresence,
  discordAvatarUrl,
  STATUS_COLORS,
} from "@/lib/discord-lanyard/lanyard";
import type { DiscordPresence } from "@/types";
import type { Theme } from "@/types";

export function DiscordPresenceBadge({
  discordId,
  theme,
}: {
  discordId: string;
  theme: Theme;
}) {
  const [presence, setPresence] = useState<DiscordPresence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await fetchDiscordPresence(discordId);
      if (!cancelled) {
        setPresence(data);
        setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 20000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [discordId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
        <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-600" />
        Loading Discord status…
      </div>
    );
  }

  if (!presence) return null;

  const activity = presence.activities.find((a) => a.type !== 4);
  const customStatus = presence.activities.find((a) => a.type === 4);
  const statusColor = STATUS_COLORS[presence.discord_status] ?? STATUS_COLORS.offline;

  return (
    <div
      className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs backdrop-blur-sm"
      style={{ borderColor: theme.buttonBorder }}
    >
      <div className="relative shrink-0">
        <img
          src={discordAvatarUrl(presence.discord_user.id, presence.discord_user.avatar)}
          alt=""
          className="h-6 w-6 rounded-full"
        />
        <span
          className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-black"
          style={{ backgroundColor: statusColor }}
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-medium text-zinc-200">
          {presence.discord_user.global_name ?? presence.discord_user.username}
        </span>
        {presence.listening_to_spotify && presence.spotify ? (
          <span className="text-zinc-500">
            🎧 {presence.spotify.song} — {presence.spotify.artist}
          </span>
        ) : activity ? (
          <span className="text-zinc-500">
            Playing {activity.name}
            {activity.details ? ` · ${activity.details}` : ""}
          </span>
        ) : customStatus?.state ? (
          <span className="text-zinc-500">{customStatus.state}</span>
        ) : (
          <span className="capitalize text-zinc-500">{presence.discord_status}</span>
        )}
      </div>
    </div>
  );
}
