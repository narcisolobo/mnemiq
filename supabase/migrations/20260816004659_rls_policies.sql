-- Row Level Security.
--
-- RLS is enabled on every table so nothing is exposed via the PostgREST API
-- until a policy explicitly allows it (service_role bypasses RLS regardless,
-- so trusted server-side/Edge Function code is unaffected).
--
-- Only trivial, unambiguous policies are defined below. Several tables are
-- left with RLS enabled and NO policies — meaning fully locked to anon/
-- authenticated until real policies are written. Those need a product/
-- security decision before the app can read or write them via the API. See
-- the summary in this migration's accompanying conversation for the full
-- list; the short version:
--
--   * card_decks / cards — visibility needs to combine is_public,
--     is_official, and moderation_status. Undecided: should anon (logged-out)
--     reads be restricted to is_official decks only (enforcing "sign up to
--     study community decks" at the DB layer), or should all public decks be
--     readable by anon with that restriction left as a UI-only gate?
--   * users — public profile fields (username, avatar, level, xp, streak,
--     created_at) vs. private fields (email) need either a public view, a
--     security-definer function, or column-level grants — plain table RLS
--     can't split visibility by column.
--   * deck_ratings / comments / forks — need "read if parent deck is
--     public (and not moderation-held), write only your own row" policies;
--     straightforward in shape but depends on the card_decks visibility
--     decision above.
--   * user_badges — depends on whether user profile pages are public
--     (consistent with the "GitHub for flashcards" framing) or gated.
--   * reports / user_strikes writes, and moderator-only reads — there is no
--     admin/moderator role modeled in the schema yet, so these can't be
--     written without first deciding how staff access is represented.
--   * tags / card_deck_tags — public read is presumably safe, but insert
--     (creating a new tag vs. attaching an existing one) needs a decision on
--     whether any authenticated user can mint new tags freely.

alter table public.users enable row level security;
alter table public.card_decks enable row level security;
alter table public.cards enable row level security;
alter table public.study_sessions enable row level security;
alter table public.card_reviews enable row level security;
alter table public.deck_ratings enable row level security;
alter table public.comments enable row level security;
alter table public.forks enable row level security;
alter table public.tags enable row level security;
alter table public.card_deck_tags enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.xp_events enable row level security;
alter table public.notification_log enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.reports enable row level security;
alter table public.user_strikes enable row level security;

-- notification_preferences: users manage only their own preferences.
create policy "Users can view their own notification preferences"
  on public.notification_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own notification preferences"
  on public.notification_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own notification preferences"
  on public.notification_preferences for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own notification preferences"
  on public.notification_preferences for delete
  using (auth.uid() = user_id);

-- notification_log: read-only history of a user's own sent emails. Rows are
-- written by trusted server-side code (service_role bypasses RLS), so no
-- insert/update/delete policy is defined for authenticated users.
create policy "Users can view their own notification log"
  on public.notification_log for select
  using (auth.uid() = user_id);

-- xp_events: read-only audit trail of a user's own XP history. XP-earning
-- actions must be validated server-side to prevent self-awarded XP, so no
-- insert policy is defined for authenticated users.
create policy "Users can view their own XP events"
  on public.xp_events for select
  using (auth.uid() = user_id);

-- user_strikes: users can see their own violation history. Strikes are
-- issued by trusted server-side/moderator logic, not self-service, so no
-- insert policy is defined for authenticated users.
create policy "Users can view their own strikes"
  on public.user_strikes for select
  using (auth.uid() = user_id);

-- badges: public, admin-managed reference data. Readable by anyone; no
-- client write policies are defined.
create policy "Badges are publicly readable"
  on public.badges for select
  using (true);
