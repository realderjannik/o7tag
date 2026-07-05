// Without an explicit maxAge, @supabase/ssr's session cookies default to
// expiring when the browser closes — users get logged out on every restart.
// 100 days keeps them signed in long-term; the actual session validity is
// still governed by Supabase's refresh token, this only controls how long
// the browser hangs on to the cookie.
//
// path MUST be set explicitly too: without it, each Set-Cookie call falls
// back to a path derived from whatever route triggered it (e.g. "/callback"
// vs "/dashboard/editor" -> "/dashboard"), fragmenting the session cookie
// across multiple path scopes. That's what made login "work" right after
// the Discord redirect but disappear on the next navigation/refresh — the
// browser was juggling several same-named cookies scoped to different paths.
export const AUTH_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 100,
  path: "/",
};
