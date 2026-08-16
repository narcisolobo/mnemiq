-- Indexes supporting search, fuzzy tag matching, and common lookup/join
-- patterns described in the PRD.

-- Full-text search on card_decks (PRD §6.5).
create index card_decks_search_vector_idx on public.card_decks using gin (search_vector);

-- Fuzzy tag autocomplete via pg_trgm (PRD §6.5).
create index tags_name_trgm_idx on public.tags using gin (name extensions.gin_trgm_ops);

-- Foreign key / lookup indexes.
create index card_decks_owner_id_idx on public.card_decks (owner_id);
create index cards_deck_id_idx on public.cards (deck_id, position);
create index study_sessions_user_id_idx on public.study_sessions (user_id);
create index study_sessions_deck_id_idx on public.study_sessions (deck_id);
create index card_reviews_card_id_idx on public.card_reviews (card_id);
create index card_reviews_user_id_idx on public.card_reviews (user_id);
create index card_reviews_session_id_idx on public.card_reviews (session_id);
-- Supports the "cards due today" dashboard query (PRD §6.3).
create index card_reviews_user_due_idx on public.card_reviews (user_id, next_review_at);
create index deck_ratings_deck_id_idx on public.deck_ratings (deck_id);
create index comments_deck_id_idx on public.comments (deck_id);
create index comments_user_id_idx on public.comments (user_id);
create index forks_original_deck_id_idx on public.forks (original_deck_id);
create index forks_forked_deck_id_idx on public.forks (forked_deck_id);
create index forks_user_id_idx on public.forks (user_id);
create index card_deck_tags_tag_id_idx on public.card_deck_tags (tag_id);
create index user_badges_user_id_idx on public.user_badges (user_id);
create index xp_events_user_id_idx on public.xp_events (user_id);
create index notification_log_user_id_idx on public.notification_log (user_id);
create index notification_preferences_user_id_idx on public.notification_preferences (user_id);
create index reports_deck_id_idx on public.reports (deck_id) where deck_id is not null;
create index reports_comment_id_idx on public.reports (comment_id) where comment_id is not null;
create index reports_status_idx on public.reports (status);
create index user_strikes_user_id_idx on public.user_strikes (user_id);
