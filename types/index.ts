export type BackgroundType = "color" | "image" | "video";

export interface Theme {
  id: string;
  slug: string;
  name: string;
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
  buttonBg: string;
  buttonBorder: string;
  buttonText: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  position: number;
  isVisible: boolean;
}

export interface PageData {
  username: string;
  displayName: string;
  bioText: string;
  avatarUrl: string;
  themeId: string;
  backgroundType: BackgroundType;
  backgroundValue: string;
  audioUrl: string | null;
  discordId: string | null;
  viewCount: number;
  isPremium: boolean;
  links: LinkItem[];
}

export interface DiscordActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
}

export interface DiscordPresence {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: {
    username: string;
    global_name?: string;
    avatar: string | null;
    id: string;
  };
  activities: DiscordActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album_art_url: string;
  } | null;
}

export type Locale = "de" | "en";
