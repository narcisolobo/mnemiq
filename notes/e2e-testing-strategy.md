# E2E Testing Strategy — MnemIQ

## Guiding Principle

Prioritize by **blast radius × frequency**, not coverage completeness. E2E tests are expensive to write and maintain for a solo dev on a tight timeline — spend them where a silent failure would be worst.

---

## Tier 1 — Always Cover

- **Auth flow** (signup, login, session persistence) — everything downstream depends on this
- **Core review loop** (start session → rate card → SM-2 schedule updates) — this is MnemIQ's entire value proposition; a bug here is existential
- **Deck creation and card CRUD** — second most-used path
- **Payment/subscription flow**, if applicable at launch

## Tier 2 — Cover Once Stable

- Fork a public deck → verify independent copy + attribution
- Rating/comment submission → moderation status doesn't incorrectly block visibility
- Notification opt-out flow → given the opt-out-only design, a bug here has legal/trust exposure (unsubscribe must actually work)

## Tier 3 — Skip E2E, Use Unit/Integration Tests Instead

- XP calculation, badge thresholds — pure logic, test at the function level
- AI generation/moderation — mock the API, test response handling, not the E2E round-trip
- Admin/internal tooling

---

## Heuristic to Apply Per Flow

1. If it touches money, auth, or data loss → E2E, no exceptions
2. If it's the "hero action" a user does repeatedly (the review loop) → E2E
3. If a bug would be silent (wrong schedule, wrong XP) vs. loud (500 error) → weight silent bugs higher; they erode trust before anyone notices
4. If it's better tested at a lower level (pure functions, DB constraints) → don't E2E it just because you can

---

## Timing Note

Given the current project phase — schema locked, migrations not yet generated — hold off writing any E2E tests until after Sprint 1–2 implementation stabilizes the review loop and auth. Writing tests against a moving target just means rewriting them later.
