-- Gamification and notification tables: badges, user_badges, xp_events,
-- notification_log, notification_preferences.
-- Source of truth: notes/core-tables.md

create table public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  criteria text not null,
  created_at timestamptz not null default now()
);

create table public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  badge_id uuid not null references public.badges (id) on delete cascade,
  earned_at timestamptz not null default now(),
  -- A badge can only be earned once per user.
  unique (user_id, badge_id)
);

create table public.xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  action text not null,
  xp_awarded integer not null,
  created_at timestamptz not null default now()
);

create table public.notification_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  type text not null check (type in (
    'daily_reminder', 'streak_at_risk', 'badge_earned',
    'deck_rated', 'deck_remixed', 'deck_flagged'
  )),
  sent_at timestamptz not null default now()
);

create table public.notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  type text not null check (type in (
    'daily_reminder', 'streak_at_risk', 'badge_earned',
    'deck_rated', 'deck_remixed', 'deck_flagged'
  )),
  -- A row represents this type's current state; when no row exists for a
  -- given (user_id, type), the app treats it as enabled by default.
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (user_id, type)
);
