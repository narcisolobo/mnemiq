-- profiles.email and profiles.suspended must stay private (owner-only, via
-- the existing "Users can view their own profile" RLS policy). Public
-- profile pages need everyone — including logged-out visitors, for
-- SEO/shareable links — to browse the non-sensitive fields of any user.
-- Plain table RLS can't split visibility by column, so this view carries
-- only the public columns. It intentionally omits `security_invoker`,
-- so it runs as its owner and bypasses the base table's own-row-only RLS
-- policy, exposing every row's public columns regardless of who queries it.
--
-- This is expected to trip the Supabase linter's "Security Definer View"
-- ERROR (lint 0010) — that check exists to catch views that *accidentally*
-- bypass RLS (e.g. over auth.users), not this deliberate column-restriction
-- pattern, which is the technique Supabase's own docs recommend for hiding
-- sensitive columns. Do NOT silence it by adding `security_invoker = true`;
-- that would collapse this back to the owner-only visibility the base
-- table's RLS policy already provides, defeating the point of this view.
create view public.profiles_public
  as
  select
    id,
    username,
    avatar,
    level,
    xp,
    current_streak,
    longest_streak,
    created_at
  from public.profiles;

grant select on public.profiles_public to anon, authenticated;
