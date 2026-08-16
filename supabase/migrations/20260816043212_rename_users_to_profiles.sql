-- public.users held app-specific profile data (username, avatar, level, xp,
-- streaks) alongside auth.users' identity/session fields. Renaming to
-- `profiles` matches Supabase convention and avoids the name clash with
-- Supabase Auth's own User type in application code.
alter table public.users rename to profiles;
