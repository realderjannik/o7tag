import type { Theme } from "@/types";

export const THEMES: Theme[] = [
  {
    id: "midnight",
    slug: "midnight",
    name: "Midnight",
    accent: "#a855f7",
    accentSoft: "rgba(168, 85, 247, 0.15)",
    bgFrom: "#0a0a12",
    bgTo: "#150f26",
    buttonBg: "rgba(168, 85, 247, 0.08)",
    buttonBorder: "rgba(168, 85, 247, 0.35)",
    buttonText: "#f3e8ff",
  },
  {
    id: "crimson",
    slug: "crimson",
    name: "Crimson",
    accent: "#ef4444",
    accentSoft: "rgba(239, 68, 68, 0.15)",
    bgFrom: "#0d0505",
    bgTo: "#240a0a",
    buttonBg: "rgba(239, 68, 68, 0.08)",
    buttonBorder: "rgba(239, 68, 68, 0.35)",
    buttonText: "#fee2e2",
  },
  {
    id: "cyber",
    slug: "cyber",
    name: "Cyber",
    accent: "#22d3ee",
    accentSoft: "rgba(34, 211, 238, 0.15)",
    bgFrom: "#050b0d",
    bgTo: "#0a1f24",
    buttonBg: "rgba(34, 211, 238, 0.08)",
    buttonBorder: "rgba(34, 211, 238, 0.35)",
    buttonText: "#cffafe",
  },
  {
    id: "void",
    slug: "void",
    name: "Void",
    accent: "#a1a1aa",
    accentSoft: "rgba(161, 161, 170, 0.15)",
    bgFrom: "#000000",
    bgTo: "#141414",
    buttonBg: "rgba(255, 255, 255, 0.05)",
    buttonBorder: "rgba(255, 255, 255, 0.15)",
    buttonText: "#e4e4e7",
  },
];

export function getTheme(themeId: string): Theme {
  return THEMES.find((t) => t.id === themeId) ?? THEMES[0];
}
