-- Moderation tables: reports, user_strikes.
-- Source of truth: notes/core-tables.md

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  -- Polymorphic report target: exactly one of deck_id / comment_id is set.
  -- Mirrors the nullable-FK pattern used by user_strikes.deck_id.
  deck_id uuid references public.card_decks (id) on delete cascade,
  comment_id uuid references public.comments (id) on delete cascade,
  reporter_id uuid not null references public.users (id) on delete cascade,
  reason text not null,
  status text not null default 'pending'
    check (status in ('pending', 'resolved', 'dismissed')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint reports_exactly_one_target check (
    (deck_id is not null and comment_id is null)
    or (deck_id is null and comment_id is not null)
  )
);

create table public.user_strikes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  deck_id uuid references public.card_decks (id) on delete set null,
  reason text not null,
  action text not null check (action in ('warning', 'deck_removal', 'suspension')),
  created_at timestamptz not null default now()
);
