-- Fixes "permission denied for table X" (Postgres error 42501) after
-- 0001_init.sql: RLS policies alone don't grant access — Postgres also
-- needs baseline table privileges for the anon/authenticated roles that
-- PostgREST uses. The Supabase Table Editor sets these up automatically;
-- raw SQL via the SQL Editor does not.

grant usage on schema public to anon, authenticated;

-- users: private, only authenticated (RLS restricts to own row)
grant select, insert, update on public.users to authenticated;

-- themes: public read-only reference data
grant select on public.themes to anon, authenticated;

-- pages: public read, owner write (RLS restricts writes to own row)
grant select on public.pages to anon, authenticated;
grant insert, update, delete on public.pages to authenticated;

-- links: public read, owner write
grant select on public.links to anon, authenticated;
grant insert, update, delete on public.links to authenticated;

-- reports: anyone (including anonymous) can file one; nobody can read via API
grant insert on public.reports to anon, authenticated;
