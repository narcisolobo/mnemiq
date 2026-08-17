-- profiles was left with RLS enabled and no policies (see
-- 20260816004659_rls_policies.sql), which locks out every request including
-- a user reading their own row. This adds the minimal own-row policy needed
-- for AuthProvider's profile fetch; public visibility of other users'
-- profiles is still an open product decision (see that migration's notes).

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);
