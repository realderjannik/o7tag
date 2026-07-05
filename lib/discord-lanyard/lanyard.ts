import type { DiscordPresence } from "@/types";

const LANYARD_BASE_URL = "https://api.lanyard.rest/v1/users";

interface LanyardResponse {
  success: boolean;
  data: DiscordPresence;
}

export async function fetchDiscordPresence(
  discordId: string
): Promise<DiscordPresence | null> {
  try {
    const res = await fetch(`${LANYARD_BASE_URL}/${discordId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: LanyardResponse = await res.json();
    if (!json.success) return null;
    return json.data;
  } catch {
    return null;
  }
}

export function discordAvatarUrl(userId: string, avatarHash: string | null): string {
  if (!avatarHash) {
    return `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(userId) % BigInt(5))}.png`;
  }
  const ext = avatarHash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}`;
}

export const STATUS_COLORS: Record<string, string> = {
  online: "#23a55a",
  idle: "#f0b232",
  dnd: "#f23f43",
  offline: "#80848e",
};
