const RESERVED_USERNAMES = new Set([
  "admin",
  "api",
  "dashboard",
  "login",
  "logout",
  "settings",
  "editor",
  "analytics",
  "impressum",
  "tos",
  "privacy",
  "o7tag",
  "support",
  "help",
  "about",
]);

const USERNAME_PATTERN = /^[a-z0-9_]{3,20}$/;

export function isValidUsername(username: string): boolean {
  const normalized = username.toLowerCase();
  return USERNAME_PATTERN.test(normalized) && !RESERVED_USERNAMES.has(normalized);
}

export function daysUntilUsernameChangeAllowed(
  usernameChangedAt: string | null,
  cooldownDays = 30
): number {
  if (!usernameChangedAt) return 0;
  const changed = new Date(usernameChangedAt).getTime();
  const elapsedDays = (Date.now() - changed) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(cooldownDays - elapsedDays));
}
