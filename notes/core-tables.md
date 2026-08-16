# Core Tables

| users           | data type   | description |
|-----------------|-------------|-------------|
| id              | uuid        | Primary key; matches the Supabase Auth user id |
| username        | text        | Unique display name; shown on profile and next to level badge in comments |
| email           | text        | User's email address, from Google SSO |
| avatar          | text        | URL to the user's avatar image |
| level           | integer     | Current level, derived from xp (floor(xp / 500)) |
| xp              | integer     | Total experience points earned |
| current_streak  | integer     | Current daily study streak count |
| longest_streak  | integer     | Longest daily study streak ever reached; updated to GREATEST(longest_streak, current_streak) whenever current_streak changes |
| created_at      | timestamptz | When the account was created; powers "Member since" on profile |
| suspended       | boolean     | Whether the account is suspended due to ToS strikes; blocks login when true |

| card_decks       | data type   | description |
|------------------|-------------|-------------|
| id               | uuid        | Primary key |
| owner_id         | uuid        | References users.id; the deck's author |
| title            | text        | Deck title |
| description      | text        | Deck description |
| is_public        | boolean     | Whether the deck is publicly visible and studyable by other users |
| is_official      | boolean     | Marks MnemIQ-curated free decks; studyable without signup and exempt from the moderation queue |
| moderation_status | text        | Moderation state: clear, pending, held, or rejected. Set to pending/held when Obscenity flags text on publish or a community report is filed |
| ai_safety_rating | numeric     | Claude-generated content safety score (post-launch) |
| community_rating | numeric     | Aggregate community star rating (1-5) |
| search_vector    | tsvector    | Generated, stored column combining title (weight A) and description (weight B) via to_tsvector; GIN-indexed for full-text search |
| created_at       | timestamptz | When the deck was created; powers "newest" sort on Browse page |
| updated_at       | timestamptz | When the deck was last edited |

| cards            | data type   | description |
|------------------|-------------|-------------|
| id               | uuid        | Primary key |
| deck_id          | uuid        | References card_decks.id |
| front            | text        | Front side text content |
| back             | text        | Back side text content |
| front_image_url  | text        | URL to the front side's uploaded image, nullable |
| back_image_url   | text        | URL to the back side's uploaded image, nullable |
| position         | integer     | Sort order of the card within its deck; drives drag-and-drop reordering |
| created_at       | timestamptz | When the card was created |
| updated_at       | timestamptz | When the card was last edited |

| study_sessions | data type   | description |
|----------------|-------------|-------------|
| id             | uuid        | Primary key |
| user_id        | uuid        | References users.id |
| deck_id        | uuid        | References card_decks.id being studied |
| started_at     | timestamptz | When the session began |
| completed_at   | timestamptz | When the session was completed (null while in progress or paused) |
| paused         | boolean     | Whether the session is currently paused; drives resume-from-pause-screen behavior |

| card_reviews   | data type   | description |
|----------------|-------------|-------------|
| id             | uuid        | Primary key |
| card_id        | uuid        | References cards.id |
| user_id        | uuid        | References users.id |
| session_id     | uuid        | References study_sessions.id; links this review to the session it was reviewed in |
| reviewed_at    | timestamptz | When the review occurred |
| rating         | text        | Rating given: retry, hard, good, or easy |
| ease_factor    | numeric     | SM-2 ease factor for the card as of this review |
| difficulty     | numeric     | Difficulty signal tracked separately from ease_factor, as of this review; mitigates ease-hell so a single lapse doesn't compound like a genuinely hard card's history |
| interval       | integer     | Days until the next scheduled review |
| next_review_at | timestamptz | Computed date/time the card is next due |

| badges      | data type   | description |
|-------------|-------------|-------------|
| id          | uuid        | Primary key |
| name        | text        | Badge name (e.g. "First Steps") |
| description | text        | Human-readable description of the badge |
| criteria    | text        | Machine-checkable condition that triggers the badge award |
| created_at  | timestamptz | When the badge definition was created |

| user_badges | data type   | description |
|-------------|-------------|-------------|
| id          | uuid        | Primary key |
| user_id     | uuid        | References users.id |
| badge_id    | uuid        | References badges.id |
| earned_at   | timestamptz | When the badge was awarded |

| deck_ratings | data type   | description |
|--------------|-------------|-------------|
| id           | uuid        | Primary key |
| deck_id      | uuid        | References card_decks.id; unique constraint on (deck_id, user_id) — rating is upserted, not re-inserted, on re-rate |
| user_id      | uuid        | References users.id; unique constraint on (deck_id, user_id) |
| rating       | integer     | Star rating, 1-5 |
| created_at   | timestamptz | When the rating was first given |
| updated_at   | timestamptz | When the rating was last changed |

| forks            | data type   | description |
|------------------|-------------|-------------|
| id               | uuid        | Primary key |
| original_deck_id | uuid        | References card_decks.id being remixed |
| forked_deck_id   | uuid        | References card_decks.id created from the remix |
| user_id          | uuid        | References users.id who performed the remix |
| created_at       | timestamptz | When the remix was created |

| xp_events   | data type   | description |
|-------------|-------------|-------------|
| id          | uuid        | Primary key |
| user_id     | uuid        | References users.id |
| action      | text        | XP-earning action type (e.g. study_session_completed, streak_milestone, deck_published, five_star_rating_received, deck_remixed, deck_was_remixed, first_deck_created, first_session_completed) |
| xp_awarded  | integer     | Amount of XP granted for this event |
| created_at  | timestamptz | When the XP was awarded |

| comments    | data type   | description |
|-------------|-------------|-------------|
| id          | uuid        | Primary key |
| deck_id     | uuid        | References card_decks.id |
| user_id     | uuid        | References users.id; the comment's author |
| body        | text        | Comment text content |
| created_at  | timestamptz | When the comment was posted |
| updated_at  | timestamptz | When the comment was last edited (null if never edited) |

| tags       | data type   | description |
|------------|-------------|-------------|
| id         | uuid        | Primary key |
| name       | text        | Normalized, unique tag name |
| created_at | timestamptz | When the tag was first created |

| card_deck_tags | data type   | description |
|----------------|-------------|-------------|
| deck_id        | uuid        | References card_decks.id; composite primary key with tag_id |
| tag_id         | uuid        | References tags.id; composite primary key with deck_id |
| created_at     | timestamptz | When the tag was applied to the deck |

| notification_log | data type   | description |
|------------------|-------------|-------------|
| id               | uuid        | Primary key |
| user_id          | uuid        | References users.id; the recipient |
| type             | text        | Notification type (daily_reminder, streak_at_risk, badge_earned, deck_rated, deck_remixed, deck_flagged) |
| sent_at          | timestamptz | When the email was sent |

| notification_preferences | data type   | description |
|---------------------------|-------------|-------------|
| id                         | uuid        | Primary key |
| user_id                    | uuid        | References users.id |
| type                       | text        | Notification type this preference applies to (daily_reminder, streak_at_risk, badge_earned, deck_rated, deck_remixed, deck_flagged) |
| enabled                    | boolean     | Whether this notification type is enabled; row only exists for opt-outs, so absence implies enabled |
| updated_at                 | timestamptz | When the preference was last changed |

| ai_generation_credits (placeholder) | data type | description |
|--------------------------------------|-----------|-------------|
| — | — | Not yet designed. Post-launch (§8) — will need a credit balance per user (starting at 5 free credits) plus a purchase/consumption ledger (bundle, price paid, credits granted, credits spent per AI generation request). Revisit when Sprint 9+ AI card generation work is scoped. |

| reports      | data type   | description |
|--------------|-------------|-------------|
| id           | uuid        | Primary key |
| deck_id      | uuid        | References card_decks.id; the reported deck, nullable — exactly one of deck_id / comment_id is set |
| comment_id   | uuid        | References comments.id; the reported comment, nullable — exactly one of deck_id / comment_id is set |
| reporter_id  | uuid        | References users.id; who filed the report |
| reason       | text        | Reason given for the report |
| status       | text        | Report status: pending, resolved, or dismissed |
| created_at   | timestamptz | When the report was filed |
| resolved_at  | timestamptz | When the report was resolved or dismissed, nullable while pending |

Migration notes:
- CHECK constraint enforcing exactly one of `deck_id` / `comment_id` is non-null (never both, never neither).
- Partial indexes on `deck_id` (`WHERE deck_id IS NOT NULL`) and `comment_id` (`WHERE comment_id IS NOT NULL`) for lookups per target type.
- Follows the same nullable-FK-for-polymorphic-target pattern as `user_strikes.deck_id`.

| user_strikes | data type   | description |
|--------------|-------------|-------------|
| id           | uuid        | Primary key |
| user_id      | uuid        | References users.id; the user issued the strike |
| deck_id      | uuid        | References card_decks.id; the deck that triggered the strike, nullable |
| reason       | text        | Reason for the strike |
| action       | text        | Action taken: warning, deck_removal, or suspension |
| created_at   | timestamptz | When the strike was issued |
