# MnemIQ — Routing & Auth Requirements

**Version:** 1.0
**Last Updated:** August 2026

---

## Logged-Out (Public Routes)

| Route                 | Notes                                                           |
| --------------------- | --------------------------------------------------------------- |
| `/`                   | Landing page                                                    |
| `/auth/sign-in`       | Redirect to `/dashboard` if already logged in                   |
| `/auth/sign-up`       | Redirect to `/dashboard` if already logged in                   |
| `/community`          | Browse only — rate/remix/comment requires auth                  |
| `/community/[deckId]` | View + study free decks only; community decks show a signup CTA |
| `/u/[username]`       | Public profile — read only                                      |

---

## Logged-In Only (Protected Routes)

| Route                     | Notes                                                  |
| ------------------------- | ------------------------------------------------------ |
| `/dashboard`              | Redirect to `/` if logged out                          |
| `/study/[deckId]`         | Community decks only; free decks accessible logged out |
| `/study/[deckId]/summary` | Logged out users get a signup CTA instead              |
| `/decks`                  | My decks list                                          |
| `/decks/new`              | Create deck                                            |
| `/decks/[deckId]`         | Own deck detail                                        |
| `/decks/[deckId]/edit`    | Edit deck                                              |
| `/profile`                | Own profile                                            |
| `/settings`               | Account settings                                       |
| `/onboarding`             | First-time users only, post-signup                     |

---

## Implementation Notes

### `/community/[deckId]` — Conditional Rendering

The trickiest route — needs to conditionally render based on both auth state and whether the deck is a free (MnemIQ Official) or community deck:

| Deck Type              | Logged Out                      | Logged In   |
| ---------------------- | ------------------------------- | ----------- |
| Free (MnemIQ Official) | Full access — view + study      | Full access |
| Community              | View only — signup CTA on study | Full access |

Handle with a single server component that checks both conditions and renders accordingly.

### `/u/[username]` — Public Profiles

Fully public — good for SEO and lets students share their profile link without requiring the viewer to sign up. Read-only for logged-out users.

### Auth Redirects

- Logged-out users hitting any protected route → redirect to `/auth/sign-in`
- Logged-in users hitting `/auth/sign-in` or `/auth/sign-up` → redirect to `/dashboard`
- First-time users post-signup → redirect to `/onboarding`

### Robots.txt

- Allow indexing: `/`, `/community`, `/community/[deckId]`, `/u/[username]`
- Block indexing: `/dashboard`, `/decks`, `/study`, `/settings`, `/profile`, `/onboarding`, `/auth`
