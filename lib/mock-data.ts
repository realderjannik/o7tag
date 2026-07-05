import type { PageData } from "@/types";

export const MOCK_PAGES: Record<string, PageData> = {
  ghost: {
    username: "ghost",
    displayName: "ghost",
    bioText: "full-time gamer, part-time menace. building stuff at night.",
    avatarUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=ghost&backgroundType=gradientLinear",
    themeId: "midnight",
    backgroundType: "color",
    backgroundValue: "",
    audioUrl: null,
    discordId: "884568999565791313",
    viewCount: 4821,
    isPremium: true,
    links: [
      { id: "l1", label: "Twitch", url: "https://twitch.tv", icon: "twitch", position: 0, isVisible: true },
      { id: "l2", label: "YouTube", url: "https://youtube.com", icon: "youtube", position: 1, isVisible: true },
      { id: "l3", label: "Discord Server", url: "https://discord.com", icon: "discord", position: 2, isVisible: true },
      { id: "l4", label: "X / Twitter", url: "https://x.com", icon: "twitter", position: 3, isVisible: true },
    ],
  },
  nyx: {
    username: "nyx",
    displayName: "nyx",
    bioText: "clips, chaos, and questionable decisions.",
    avatarUrl: "https://api.dicebear.com/9.x/identicon/svg?seed=nyx&backgroundType=gradientLinear",
    themeId: "crimson",
    backgroundType: "color",
    backgroundValue: "",
    audioUrl: null,
    discordId: "884568999565791313",
    viewCount: 1209,
    isPremium: false,
    links: [
      { id: "l1", label: "TikTok", url: "https://tiktok.com", icon: "tiktok", position: 0, isVisible: true },
      { id: "l2", label: "Instagram", url: "https://instagram.com", icon: "instagram", position: 1, isVisible: true },
      { id: "l3", label: "Steam", url: "https://steamcommunity.com", icon: "steam", position: 2, isVisible: true },
    ],
  },
};

export function getMockPage(username: string): PageData | null {
  return MOCK_PAGES[username.toLowerCase()] ?? null;
}
