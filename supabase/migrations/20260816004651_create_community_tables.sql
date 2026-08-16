-- Community tables: deck_ratings, comments, forks, tags, card_deck_tags.
-- Source of truth: notes/core-tables.md

create table public.deck_ratings (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.card_decks (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Re-rating upserts this row instead of inserting a new one.
  unique (deck_id, user_id)
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.card_decks (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table public.forks (
  id uuid primary key default gen_random_uuid(),
  original_deck_id uuid not null references public.card_decks (id) on delete cascade,
  forked_deck_id uuid not null references public.card_decks (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.card_deck_tags (
  deck_id uuid not null references public.card_decks (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (deck_id, tag_id)
);
