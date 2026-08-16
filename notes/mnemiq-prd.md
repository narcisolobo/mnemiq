# MnemIQ — Product Requirements Document

**Version:** 1.0
**Last Updated:** August 2026
**Status:** In Planning (Sprint 0)
**Author:** Narciso Lobo

---

## 1. Overview

MnemIQ is a gamified, spaced-repetition flashcard web app targeting students. It positions itself as a modern, welcoming alternative to Anki — combining the proven science of spaced repetition with a polished community experience and medium gamification to keep students engaged and coming back daily.

The core mental model is **"GitHub for flashcards"** — users can create their own card decks, share them publicly, fork and remix others' decks, rate and comment on community content, and build a study profile over time.

---

## 2. Problem Statement

Existing flashcard tools fall into two camps:

- **Anki** — powerful spaced repetition but cluttered, utilitarian, and unfinished-feeling. High learning curve. Unappealing to modern students.
- **Quizlet** — polished and approachable but weak on spaced repetition and increasingly paywalled.

MnemIQ fills the gap: **Anki's learning science + Quizlet's approachability + a GitHub-style community layer.**

---

## 3. Target Audience

**Primary:** Students (high school, college, and self-directed learners)

**Characteristics:**

- Studying for exams, certifications, or language learning
- Familiar with modern web apps and expect polished UX
- Motivated by social proof, progress visibility, and light competition
- May already use Anki or Quizlet but find them lacking in some way

---

## 4. Goals & Success Metrics

| Goal                      | Metric                                                 |
| ------------------------- | ------------------------------------------------------ |
| Drive daily study habits  | Daily active users, average session frequency          |
| Retain users long-term    | 30-day retention rate, average streak length           |
| Build a healthy community | Number of public decks, remixes, ratings, and comments |
| Keep content safe         | % of flagged decks caught by AI moderation             |

---

## 5. Tech Stack

| Layer            | Choice                                                        |
| ---------------- | ------------------------------------------------------------- |
| Frontend         | Next.js (App Router)                                          |
| Database         | Supabase (Postgres)                                           |
| Auth             | Supabase Auth + Google SSO                                    |
| Styling          | Tailwind + DaisyUI                                            |
| State Management | Zustand                                                       |
| AI               | Anthropic API (Claude)                                        |
| Email            | Resend + React Email                                          |
| Scheduling       | Supabase Edge Functions + pg_cron                             |
| Deployment       | Vercel                                                        |
| Image Processing | browser-image-compression (resize, compress, WebP conversion) |
| Image Moderation | NSFWJS + TensorFlow.js (client-side, pre-upload)              |
| Text Moderation  | Obscenity (server-side, on publish)                           |

---

## 6. Core Features

### 6.1 Authentication

- Google SSO via Supabase Auth
- Protected routes for all authenticated content
- Auth state managed via React Context

### 6.2 Card Decks & Cards

- Users can create, edit, and delete card decks
- Each card has a front and back — either or both sides can be text, image, or text + image
- Image-only cards are fully supported
- Cards can be reordered via drag and drop
- Card decks can be public or private
- Public card decks are subject to content moderation (text via Obscenity, images via NSFWJS)

#### Image Card Support

- Accepted formats: JPG, PNG, WebP
- Max upload size: 5MB (pre-compression)
- Client-side processing pipeline before upload:
  - NSFWJS screens image — rejects upload if flagged
  - Resized to max 1200px on longest side
  - Compressed and converted to WebP
- Images stored in Supabase Storage (`card-images` bucket)
- `cards` table stores `front_image_url` and `back_image_url` (both nullable)

### 6.3 Spaced Repetition (SM-2)

- Study sessions powered by the SM-2 algorithm
- Rating options per card: Retry / Hard / Good / Easy
- SM-2 calculates next review interval after each rating
- Card review history stored in `card_reviews` table
- "Cards due today" count surfaced on dashboard
- "Quick study" mode — study all due cards across all decks

SM-2 is the right choice for launch precisely because it needs no per-user review history to behave reasonably — the alternative, FSRS, only outperforms SM-2 once a user has accumulated hundreds of reviews, making it a poor fit for a new app with no legacy data. MnemIQ's implementation deliberately improves on two well-documented SM-2 pain points without adopting FSRS's full ML model.

#### MVP Improvements over Standard SM-2

- **Ease hell mitigation:** Standard SM-2 ties a card's difficulty entirely to its ease factor, which only ratchets downward on Retry/Hard and floors at 130% — a card that fails repeatedly gets reviewed unnecessarily often as its interval growth stalls. MnemIQ tracks a difficulty signal separate from the ease factor so a single lapse doesn't compound the same way as a genuinely hard card's history.
- **Proportional lapse decay:** Standard SM-2 resets a card's interval to the initial learning step on any failure, regardless of review history — a card successfully reviewed 15 times and then forgotten once is treated identically to a brand-new card. MnemIQ decays the interval proportionally to prior successful reviews on lapse instead of hard-resetting it.

#### Future Considerations

- **Overdue scheduling calibration:** SM-2's fixed interval multiplier is applied the same way regardless of how overdue a card is, which tends to overshoot on cards reviewed well past their due date. A damping factor proportional to overdueness is worth exploring post-MVP.
- **Response-latency signal:** SM-2 only captures a binary/graded rating with no signal for how long a user took to answer. Capturing response time client-side and using it as a soft input to ease/interval calculation is a candidate for a later iteration.

### 6.4 Study Sessions

- Session start screen with due card count
- Flashcard flip animation (front → back)
- Fully keyboard-navigable review session (see Keyboard Shortcuts below)
- Session progress indicator
- Session summary screen on completion
- Session pause and resume

#### Keyboard Shortcuts

| Key                | Action                                                  |
| ------------------ | ------------------------------------------------------- |
| `Space`            | Flip card (front → back)                                |
| `1`                | Retry                                                   |
| `2`                | Hard                                                    |
| `3`                | Good                                                    |
| `4`                | Easy                                                    |
| `Ctrl+Z` / `Cmd+Z` | Undo last rating                                        |
| `Esc`              | Pause session                                           |
| `Enter`            | Resume from pause screen / advance past session summary |

- Rating keys (`1`–`4`) are ignored until the card has been flipped — matches Anki's behavior and prevents mis-rating an unseen card
- Undo reverts the last `card_reviews` row and recalculates the card's interval/ease accordingly
- "End session" is a click-only action reachable from the pause screen, not bound to a key, so an accidental keystroke can't terminate a session
- `R` (replay audio) is reserved for post-launch, contingent on audio card support

### 6.5 Community Features

- Users can publish card decks publicly
- Community browse page with search, filter by tag, and sort options
- Full-text search on set title and description (Postgres `tsvector`)
- Set detail page with deck preview, author info, and social features
- **Ratings:** Community star rating (1–5) per deck
- **Comments:** Add, edit, delete comments on public decks
- **Remix:** Remix any public deck into your own library, with attribution
- **Tags:** User-defined tags with debounced autocomplete, fuzzy matching via `pg_trgm`, and normalization on save

### 6.6 Content Moderation

#### Launch Moderation Stack (zero API cost)

- **Text moderation:** Obscenity npm package screens deck titles, descriptions, and card text on publish. Decks containing flagged content are held for review.
- **Image moderation:** NSFWJS (TensorFlow.js) screens images client-side before upload. Flagged images are rejected before they reach Supabase Storage.
- **Community reporting:** "Report this deck" button on all public deck detail pages. Flagged decks enter a manual review queue.
- **ToS + strike system:** Users agree to content policy at signup. Violations result in warnings, deck removal, or account suspension.

#### Post-Launch Moderation (once revenue supports it)

- Claude (Anthropic API) introduced for deeper content safety screening
- Dual rating system on deck detail page:
  - **AI safety rating** — content safety score from Claude
  - **Community rating** — usefulness score from user ratings
- Authors notified by email when their deck is flagged
- AI accuracy moderation remains out of scope — community ratings handle quality

### 6.7 AI Card Generation _(Stretch Goal — Sprint 9)_

- "Generate cards with AI" button in card deck editor
- Input modes:
  - Type a topic or subject
  - Paste notes or text
  - Upload a PDF or image
- Claude generates structured card objects (front/back JSON)
- User reviews and edits generated cards before saving
- Streaming response for perceived performance
- XP awarded for using AI generation

### 6.8 Gamification

- **XP system** — earned through study and community actions
- **Levels** — calculated from total XP (level = floor(xp / 500))
- **Badges** — auto-awarded when criteria are met
- Level badge displayed on profile and next to username in comments
- Level up and badge earned toast notifications

#### XP-Earning Actions

| Action                              | Notes                  |
| ----------------------------------- | ---------------------- |
| Complete a study session            | Core loop reward       |
| Streak milestones (7, 30, 100 days) | Retention reward       |
| Publish a card deck                 | Community contribution |
| Receive a 5-star rating             | Quality reward         |
| Remix another user's deck           | Community engagement   |
| Have your deck remixed              | Influence reward       |
| First card deck created             | Onboarding reward      |
| First study session completed       | Onboarding reward      |

#### Initial Badge List

| Badge           | Criteria                          |
| --------------- | --------------------------------- |
| 🌱 First Steps  | Complete your first study session |
| 🔥 On Fire      | Reach a 7-day streak              |
| 🏆 Veteran      | Reach a 30-day streak             |
| 📚 Author       | Publish your first card deck      |
| ⭐ Star Teacher | Receive a 5-star rating           |
| 🔀 Remixed      | Have your deck remixed            |
| 🧬 Scholar      | Review 1,000 cards total          |
| 💡 Curious      | Study 10 different card decks     |

<a href="https://www.flaticon.com/free-icons/fire" title="fire icons">Fire icons created by Magnific - Flaticon</a>

### 6.9 Streaks

- Daily streak tracked and incremented on study session completion
- Streak reset at midnight via pg_cron if user hasn't studied that day
- Current streak and longest streak displayed on dashboard and profile
- Streak flame icon with milestone animations

### 6.10 Notification System

- **Email types:**
  - 📬 Daily reminder — cards due today with link to quick study mode
  - 🔥 Streak at risk — sent in the evening if user hasn't studied
  - 🏆 Badge earned
  - ⭐ Deck rated (5-star)
  - 🔀 Deck remixed
  - 🚨 Deck flagged for content policy violation
- Per-type notification preferences in user settings
- Unsubscribe link in every email
- Scheduled via pg_cron + Supabase Edge Functions
- In-app streak-at-risk indicator on dashboard

### 6.11 Progress Tracking

- Per card deck: cards mastered vs. in progress vs. unseen, average ease factor, next review dates, study history graph
- Overall profile: total cards reviewed, total sessions, average daily cards
- Progress graphs built with Recharts

### 6.12 Personalization

- DaisyUI theme picker — students choose their preferred theme
- Theme preference persisted to `localStorage` and managed via Zustand (no cross-device sync)

---

## 7. Database Schema (Core Tables)

See [`core-tables.md`](./core-tables.md) for the full schema.

---

## 8. Monetization

### Philosophy

MnemIQ launches completely free. All core features — spaced repetition, community card decks, gamification, and notifications — are free forever. No paywalled study features, no artificial limits on the core loop. Trust is built first, monetization follows.

The one paid feature is **AI card generation** — a new capability introduced after launch, behind a credit system. Users are never charged for something that was previously free.

### AI Card Generation Credits

**Free credits on signup:** 5 credits (enough to meaningfully try the feature)

**Credit bundles (à la carte):**

| Bundle   | Credits | Price  | Per Generation |
| -------- | ------- | ------ | -------------- |
| Starter  | 10      | $1.99  | $0.20          |
| Standard | 50      | $7.99  | $0.16          |
| Plus     | 150     | $19.99 | $0.13          |

**Rules:**

- 1 credit = 1 AI generation request, regardless of card count produced
- Credits never expire
- Bulk pricing incentivizes larger purchases
- Free credit amount is a growth lever — adjustable post-launch

### Competitive Positioning

- Quizlet Plus: $35.99/year (paywalled core features, poor reputation for paywall creep)
- Anki: Free desktop, $24.99 iOS one-time
- MnemIQ: Free core, pay only for AI generation

### Future Monetization Considerations

- Creator monetization (authors charge for premium decks, MnemIQ takes a cut) — strong long-term play given "GitHub for flashcards" positioning
- Institutional / B2B (schools, tutoring centers) — longer sales cycle, higher revenue per customer
- Cosmetic purchases (theme packs, badge packs) — low ceiling but zero subscription fatigue

---

## 9. Out of Scope (MVP)

- Leaderboards (dropped in favor of badges/levels only)
- AI content moderation (replaced by Obscenity + NSFWJS + community reporting at launch)
- AI accuracy moderation (community ratings handle quality)
- Mobile app (web-first, mobile-responsive)
- Payments or premium tier (introduced post-launch with AI generation)
- Multiplayer or real-time study modes

---

## 10. Sprint Plan

| Cycle | Focus                        | Start  | End    |
| ----- | ---------------------------- | ------ | ------ |
| 0     | Wireframes & Planning        | Aug 17 | Aug 30 |
| 1     | Foundation Part 1            | Aug 31 | Sep 13 |
| 2     | Foundation Part 2            | Sep 14 | Sep 27 |
| 3     | Core Study Experience Part 1 | Sep 28 | Oct 11 |
| 4     | Core Study Experience Part 2 | Oct 12 | Oct 25 |
| 5     | Community Features Part 1    | Oct 26 | Nov 8  |
| 6     | Community Features Part 2    | Nov 9  | Nov 22 |
| 7     | Gamification                 | Nov 23 | Dec 6  |
| 8     | Notification System          | Dec 7  | Dec 20 |
| 9     | AI Card Generation + Polish  | Dec 21 | Jan 3  |

**MVP Target: January 3, 2027**

### Post-MVP Sprints

| Cycle | Focus              | Notes                                                              |
| ----- | ------------------ | ------------------------------------------------------------------ |
| 10    | Admin Dashboard    | Key metrics, community health, moderation queue                    |
| 11    | Anki Import        | CSV and .apkg import to lower switching cost from Anki             |
| 12    | AI Moderation      | Claude-powered content safety screening (once revenue supports it) |
| 13    | AI Card Generation | Credit-based, paid feature                                         |

---

## 11. Pages & Content

### Public (Unauthenticated)

**Landing Page**

- Hero section (value proposition, CTA to sign up)
- Feature highlights (spaced repetition, community, gamification)
- Sample/preview of community card decks
- Testimonials or social proof (post-launch)
- Header with login button
- Footer

**Login Page**

- Google SSO button
- App branding
- Brief value prop

---

### Core App (Authenticated)

**Dashboard**

- Streak indicator (🔥 current streak)
- XP progress bar toward next level
- Cards due today count + quick study CTA
- Streak at risk indicator (conditional)
- Recent card decks
- Recent community activity (decks you've starred/remixed)

**Study Session**

- Flashcard (front, flip to reveal back)
- Session progress indicator (e.g. 12/30)
- Rating buttons (Retry / Hard / Good / Easy)
- Keyboard shortcut hints
- Pause button

**Session Summary**

- Cards reviewed count
- Accuracy breakdown
- XP earned
- Badge earned (if applicable)
- CTA to study another set or return to dashboard

---

### Card Decks

**My Card Decks (list)**

- Grid/list of user's card decks
- Create new deck button
- Per-deck: title, card count, due cards, public/private status

**Card Deck Editor**

- Deck title and description fields
- Public/private toggle
- Tag input with debounced autocomplete
- Card list (front/back per card — text, image, or both)
- Image upload per card side (drag and drop or file picker)
- Add card button
- Drag to reorder cards
- Generate cards with AI button (Sprint 9)
- Save/publish button

**Card Deck Detail (own deck)**

- Deck metadata (title, description, tags, card count)
- Study now button
- Edit button
- Cards list preview
- Stats (times studied, average ease)

---

### Community

**Browse Page**

- Search bar
- Filter by tag
- Sort controls (newest, highest rated, most studied)
- Grid of public card decks
- Per-deck card: title, author, rating, card count, remix count, comment count, tags

**Deck Detail Page (public)**

- Deck metadata (title, description, author, tags, card count)
- AI safety badge
- Community star rating + rate this deck
- Study this deck button
- Remix this deck button
- Cards preview
- Comments section (add, edit, delete)
- Remix attribution (if remixed)
- Author profile link

---

### User

**Profile Page**

- Avatar + display name
- Member since date
- Current level + level badge
- XP progress bar
- Current streak + longest streak
- Badges grid (earned + locked)
- Total cards reviewed, total sessions, average daily cards
- Published card decks

**Settings Page**

- Theme picker (DaisyUI themes)
- Notification preferences (per-type toggles)
- Display name edit
- Unsubscribe options

---

### Misc

**Onboarding Flow** _(first-time users only)_

- Step 1: Welcome screen
- Step 2: Create your first card deck (or browse community)
- Step 3: Study your first session
- Step 4: Dashboard intro

**404 / Error Page**

- Friendly message
- CTA back to dashboard

---

## 12. Content Strategy & Logged-Out Experience

### Content Tiers

| Tier                | Who Creates It    | Who Can Study It           | Notes                        |
| ------------------- | ----------------- | -------------------------- | ---------------------------- |
| **Free decks**      | MnemIQ (official) | Anyone, no signup required | Always free, curated quality |
| **Community decks** | Registered users  | Registered users only      | Subject to AI moderation     |

### Free Decks

- Curated and produced by MnemIQ on a monthly release cadence
- Always free, no account required to study
- Designed to attract quiz-curious users (state capitals, world flags, US presidents, etc.)
- Each new pack is a re-engagement opportunity — monthly email to full user base
- MnemIQ free decks serve as the quality benchmark for the platform

### Monthly Pack Ideas (Launch Backlog)

- US State Capitals
- World Flags
- US Presidents
- Countries & Capitals
- Periodic Table Elements
- Famous Paintings & Artists
- World Landmarks
- Human Anatomy Basics

### Logged-Out User Journey

1. **Entry** — Google search, shared link, or landing page
2. **Community browse** — open to all, no signup required
3. **Free deck detail page** — full deck visible, study button accessible without signup
4. **Study session** — full SM-2 experience, no restrictions for free decks
5. **Session summary** — results shown, then CTA:
   > _"Not bad. Want to remember this tomorrow?"_
   > Sign up free to save your progress and get reminded when it's time to review.
6. **Related decks row** — curated decks filtered by same tags, keeps user in funnel
7. **Community decks** — visible in browse, but studying requires signup

### Logged-Out Permissions

| Action                    | Logged Out      | Logged In |
| ------------------------- | --------------- | --------- |
| View landing page         | ✅              | ✅        |
| Browse community          | ✅              | ✅        |
| View deck detail pages    | ✅              | ✅        |
| Study free (MnemIQ) decks | ✅              | ✅        |
| Study community decks     | ❌ (signup CTA) | ✅        |
| Create card decks         | ❌              | ✅        |
| Rate / comment / remix    | ❌              | ✅        |
| Save progress             | ❌              | ✅        |
| Receive notifications     | ❌              | ✅        |

---

## 13. Admin Dashboard (Post-MVP)

### Approach

Start with **Supabase Studio saved queries** for the first few months — zero build effort, surfaces raw data immediately. Migrate to **Metabase** (open source, self-hosted, connects directly to Supabase Postgres) once data is flowing and a permanent dashboard is warranted.

A protected `/admin` route in MnemIQ itself is a future option if metrics ever need to be shared with investors or collaborators.

### Key Metrics to Track

**Growth**

- MAU and DAU (monthly and daily active users)
- New signups per week/month
- MAU month-over-month growth rate

**Retention**

- 30-day retention rate
- Average streak length
- Streak completion rate (users who study on days they have cards due)

**Community Health**

- Total public decks published
- New decks published per month
- Total remixes, ratings, and comments
- Monthly active community contributors (users who publish, remix, or rate)

**Core Loop**

- Total study sessions completed
- Average cards reviewed per session
- Cards due vs. cards reviewed ratio (are users keeping up?)

**Moderation**

- Decks flagged via community reporting
- Decks rejected by Obscenity text filter
- Images rejected by NSFWJS
- Pending moderation queue size

**Monetization (post AI launch)**

- AI generation credits purchased
- Revenue per month
- Credit bundle breakdown (Starter / Standard / Plus)

### Recommended Tooling Timeline

| Phase            | Tool                          | Reason                                    |
| ---------------- | ----------------------------- | ----------------------------------------- |
| Launch → Month 3 | Supabase Studio saved queries | Zero effort, immediate access             |
| Month 3+         | Metabase (self-hosted)        | Permanent dashboard, graphs, no coding    |
| Future           | `/admin` route in MnemIQ      | Shareable with investors or collaborators |

---

## 14. Acquisition Considerations

### What Buyers Look For

MnemIQ's most defensible asset is not the app itself — it's the community content layer. A buyer can build a flashcard app; they cannot easily replicate a thriving library of community-created, rated, and remixed decks. This is the moat worth building toward.

### Target Buyer Profiles

| Buyer Type        | Examples                              | What They Care About          |
| ----------------- | ------------------------------------- | ----------------------------- |
| Edtech strategics | Chegg, Course Hero, Quizlet, Duolingo | DAU, retention, content moat  |
| PE / roll-ups     | Edtech aggregators                    | Revenue, margins, growth rate |
| Acqui-hire        | Large tech companies                  | Team, tech, early traction    |

### Metrics That Matter

**The number to watch isn't just DAU — it's community health:**

| Metric                                | Target for Acquisition Interest       |
| ------------------------------------- | ------------------------------------- |
| DAU                                   | 5,000–20,000                          |
| 30-day retention                      | >30%                                  |
| Monthly active community contributors | 1,000+ (publishing, remixing, rating) |
| Community deck library size           | Large, diverse, high-quality          |

10,000 MAU with 1,000 active community contributors is a more compelling acquisition story than 50,000 MAU of passive studiers.

### What MnemIQ Is Building Toward

- A content moat via community decks, remixes, and ratings — hard to replicate
- Strong retention signals via streaks, gamification, and spaced repetition
- Clean, modern stack that an acquiring engineering team won't cringe at
- Transparent, trust-first monetization that doesn't alienate the user base

### Timeline Expectation

Assuming a January 2027 launch and steady organic growth, unsolicited acquisition interest is realistically 18–36 months out — provided the product is genuinely good and some marketing effort is made.

### Saleability Risks to Monitor

- **Anki brand callouts** in marketing copy — low risk (Anki is open source and community-run) but worth softening if a large acquirer's legal team flags it
- **Anthropic API dependency** — acquirers will ask about vendor lock-in. Worth maintaining a model-agnostic AI architecture that could swap providers if needed
- **Student data privacy** — COPPA (US) and GDPR (EU) compliance will come up in due diligence. Age gating and a clear data handling policy should be in place before scaling
- **DaisyUI licensing** — MIT licensed, no issues

---

## 15. Import & Export (Post-MVP)

### Anki Import

Lowering the switching cost from Anki is a meaningful acquisition lever. Students with years of Anki decks won't abandon them unless migration is painless.

**Phase 1 — CSV import (Sprint 11)**

- Simple two-column CSV (front, back)
- Covers most casual Anki users who export via plain text
- Low implementation complexity

**Phase 2 — .apkg import (future)**

- Anki's native format is a SQLite database under the hood
- More complex to parse but covers power users with media-rich decks
- Worth tackling once CSV import is validated and demand is confirmed

**Suggested copy:**

> _Bring your Anki decks with you. We don't mind._

### MnemIQ Export

Users should always be able to get their data out — this builds trust and is a strong signal to potential acquirers that MnemIQ respects its users.

- Export any deck as CSV (front, back, tags)
- Export study history as CSV
- Full account data export (GDPR compliance)

---

## 16. SEO Strategy

### Why SEO Matters for MnemIQ

Public deck detail pages are indexable by Google. A student searching "US state capitals flashcards" or "anatomy flashcards" could land directly on a MnemIQ deck — free acquisition with no ad spend. This is the most valuable organic growth channel available at launch.

### Sprint 9 SEO Checklist

- **Meta tags** — unique title and description tags on every page, especially public deck detail pages
- **Open Graph tags** — rich previews when MnemIQ links are shared on social media
- **Sitemap** — auto-generated sitemap submitted to Google Search Console
- **Google Search Console** — configured at launch to monitor search performance and indexing
- **Robots.txt** — configured to allow indexing of public pages, block admin and auth routes
- **Structured data** — JSON-LD schema markup on deck detail pages (helps Google understand content)
- **Canonical URLs** — prevent duplicate content issues (e.g. remixed decks)
- **Page speed** — Next.js App Router + Vercel gives strong Core Web Vitals out of the box; audit before launch

### Competitive Search Ads (Future)

Competitors (Quizlet, Anki) may bid on "MnemIQ" as a keyword in Google Search Ads — a common practice. Mitigation:

- Strong organic SEO ensures MnemIQ's own site ranks first for brand searches
- Bidding on competitor keywords ("Anki alternative", "Quizlet alternative", "flashcard app") is a future growth lever once revenue supports ad spend

### Content SEO (Ongoing)

- Each public community deck is a potential organic landing page
- MnemIQ free decks (state capitals, world flags, etc.) should have rich descriptions optimized for search
- Tags map naturally to topic-based search queries

---

## 17. Design Principles

- **Welcoming and modern** — intelligence signaled through design, not complexity
- **Anti-Anki** — no clutter, no utilitarian aesthetic, no unfinished feeling
- **Student-first** — approachable, encouraging, rewarding to use
- **Mobile-responsive** — study happens everywhere

---

_This document reflects decisions made during Sprint 0 planning. It will be updated as the product evolves._
