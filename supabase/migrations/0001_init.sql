-- o7tag initial schema: users, pages, links, themes, reports
-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query),
-- then also run 0002_grants.sql — RLS policies alone don't grant PostgREST
-- access; the anon/authenticated roles also need baseline table privileges,
-- which the Table Editor sets up automatically but raw SQL does not.

-- ---------------------------------------------------------------------------
-- users: private account record, 1:1 with auth.users. No public/anon access.
-- ---------------------------------------------------------------------------
create sequence if not exists public.user_uid_seq;

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  discord_id text unique not null,
  discord_username text not null,
  uid integer not null unique default nextval('public.user_uid_seq'),
  is_premium boolean not null default false,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- themes: predefined reference table, seeded below, no user-owned rows.
-- ---------------------------------------------------------------------------
create table public.themes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  config jsonb not null default '{}'::jsonb,
  sort_order int not null default 0
);

alter table public.themes enable row level security;

create policy "themes_select_all" on public.themes
  for select using (true);

insert into public.themes (slug, name, sort_order, config) values
  ('midnight', 'Midnight', 0, '{"accent":"#a855f7","accentSoft":"rgba(168,85,247,0.15)","bgFrom":"#0a0a12","bgTo":"#150f26","buttonBg":"rgba(168,85,247,0.08)","buttonBorder":"rgba(168,85,247,0.35)","buttonText":"#f3e8ff"}'),
  ('crimson', 'Crimson', 1, '{"accent":"#ef4444","accentSoft":"rgba(239,68,68,0.15)","bgFrom":"#0d0505","bgTo":"#240a0a","buttonBg":"rgba(239,68,68,0.08)","buttonBorder":"rgba(239,68,68,0.35)","buttonText":"#fee2e2"}'),
  ('cyber', 'Cyber', 2, '{"accent":"#22d3ee","accentSoft":"rgba(34,211,238,0.15)","bgFrom":"#050b0d","bgTo":"#0a1f24","buttonBg":"rgba(34,211,238,0.08)","buttonBorder":"rgba(34,211,238,0.35)","buttonText":"#cffafe"}'),
  ('void', 'Void', 3, '{"accent":"#a1a1aa","accentSoft":"rgba(161,161,170,0.15)","bgFrom":"#000000","bgTo":"#141414","buttonBg":"rgba(255,255,255,0.05)","buttonBorder":"rgba(255,255,255,0.15)","buttonText":"#e4e4e7"}');

-- ---------------------------------------------------------------------------
-- pages: public-facing profile, 1:1 with users. Username lives here (not on
-- users) since both rows are always created together during onboarding.
-- ---------------------------------------------------------------------------
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.users(id) on delete cascade,
  username text unique not null,
  username_changed_at timestamptz not null default now(),
  -- Denormalized from users.discord_id: pages is publicly readable (for the
  -- /[username] Discord-presence badge via Lanyard) but users is fully private.
  discord_id text not null,
  theme_id uuid not null references public.themes(id),
  bio_text text,
  avatar_url text,
  background_type text not null default 'color'
    check (background_type in ('color', 'image', 'video')),
  background_value text,
  audio_url text,
  view_count bigint not null default 0,
  -- Denormalized from users.is_premium: the public profile needs to know
  -- whether to hide the "made with o7tag" branding, but users is private.
  -- Keep in sync with users.is_premium whenever the Stripe webhook updates it.
  is_premium boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pages_username_idx on public.pages (lower(username));

alter table public.pages enable row level security;

create policy "pages_select_all" on public.pages
  for select using (true);

create policy "pages_insert_own" on public.pages
  for insert with check (auth.uid() = user_id);

create policy "pages_update_own" on public.pages
  for update using (auth.uid() = user_id);

create policy "pages_delete_own" on public.pages
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- links: n per page, sortable.
-- ---------------------------------------------------------------------------
create table public.links (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  label text not null,
  url text not null,
  icon text,
  position int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index links_page_id_position_idx on public.links (page_id, position);

alter table public.links enable row level security;

create policy "links_select_all" on public.links
  for select using (true);

create policy "links_write_own" on public.links
  for all using (
    auth.uid() = (select user_id from public.pages where pages.id = links.page_id)
  ) with check (
    auth.uid() = (select user_id from public.pages where pages.id = links.page_id)
  );

-- ---------------------------------------------------------------------------
-- reports: moderation groundwork. Anyone (incl. anonymous) can file a report;
-- nobody can read them via the anon/authenticated API — moderation happens
-- via the Supabase dashboard or a future service-role admin tool.
-- ---------------------------------------------------------------------------
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  reporter_user_id uuid references public.users(id) on delete set null,
  reason text not null,
  details text,
  status text not null default 'pending'
    check (status in ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index reports_status_idx on public.reports (status);

alter table public.reports enable row level security;

create policy "reports_insert_all" on public.reports
  for insert with check (true);
