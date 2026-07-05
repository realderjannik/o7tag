// Without an explicit maxAge, @supabase/ssr's session cookies default to
// expiring when the browser closes — users get logged out on every restart.
// 100 days keeps them signed in long-term; the actual session validity is
// still governed by Supabase's refresh token, this only controls how long
// the browser hangs on to the cookie.
export const AUTH_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 100,
};
