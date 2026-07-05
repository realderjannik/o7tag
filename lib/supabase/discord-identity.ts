import type { User } from "@supabase/supabase-js";

export interface DiscordIdentity {
  discordId: string;
  username: string;
  avatarUrl: string | null;
}

/**
 * Supabase doesn't document a single stable field name across providers, so
 * this reads defensively across the field names Discord's OAuth profile is
 * known to map to in `identity_data`.
 */
export function getDiscordIdentity(user: User): DiscordIdentity | null {
  const identity = user.identities?.find((i) => i.provider === "discord");
  const data = identity?.identity_data ?? user.user_metadata ?? {};

  const discordId: string | undefined =
    data.provider_id ?? data.sub ?? data.id ?? identity?.id;
  if (!discordId) return null;

  const username: string =
    data.user_name ?? data.username ?? data.full_name ?? data.name ?? "user";

  const avatarUrl: string | null = data.avatar_url ?? data.picture ?? null;

  return { discordId, username, avatarUrl };
}
