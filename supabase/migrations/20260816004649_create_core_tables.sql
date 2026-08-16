-- Core tables: users, card_decks, cards, study_sessions, card_reviews.
-- Source of truth: notes/core-tables.md

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  email text not null unique,
  avatar text,
  level integer not null default 0,
  xp integer not null default 0,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  suspended boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.card_decks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  description text,
  is_public boolean not null default false,
  is_official boolean not null default false,
  moderation_status text not null default 'clear'
    check (moderation_status in ('clear', 'pending', 'held', 'rejected')),
  ai_safety_rating numeric,
  community_rating numeric,
  -- Generated tsvector: title weighted above description, GIN-indexed in the
  -- indexes migration.
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.card_decks (id) on delete cascade,
  -- front/back are nullable together: image-only cards are supported (PRD §6.2).
  front text,
  back text,
  front_image_url text,
  back_image_url text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  deck_id uuid not null references public.card_decks (id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  paused boolean not null default false
);

create table public.card_reviews (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  session_id uuid references public.study_sessions (id) on delete set null,
  reviewed_at timestamptz not null default now(),
  rating text not null check (rating in ('retry', 'hard', 'good', 'easy')),
  -- ease_factor/difficulty/interval/next_review_at are the SM-2 (+ MnemIQ
  -- ease-hell/lapse-decay improvements, PRD §6.3) scheduling state resulting
  -- from this review, snapshotted per row so undo and history graphs work.
  ease_factor numeric not null,
  difficulty numeric not null,
  interval integer not null,
  next_review_at timestamptz not null
);
