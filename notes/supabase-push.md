# Deploying Local Supabase to a Hosted Project

How to take the local `supabase/` setup (migrations, `config.toml`) and apply it to a hosted Supabase project.

## 1. Link the project

```bash
supabase login
supabase link --project-ref <project-id>
```

Find `<project-id>` in the Supabase Dashboard URL: `https://supabase.com/dashboard/project/<project-id>`. One-time step per environment.

## 2. Push the database schema

```bash
supabase db push --dry-run   # preview
supabase db push             # apply
```

Applies everything in `supabase/migrations/` that hasn't already been applied to the linked project (tracked via `supabase_migrations.schema_migrations`).

## 3. Push project config

```bash
supabase config push
```

Pushes `config.toml`'s project-level settings — auth, API, storage — to the linked project. This is what carries over the Resend SMTP block, password policy, rate limits, email templates, and redirect URLs.

## What doesn't come along automatically

- **Secrets referenced via `env(...)`** — e.g. `pass = "env(RESEND_API_KEY)"` only resolves from local `.env.local`. Set it on the hosted project separately:

  ```bash
  supabase secrets set RESEND_API_KEY=...
  ```

  (or via the Dashboard).

- **`site_url` / `additional_redirect_urls`** — currently `http://127.0.0.1:3000`. Update these to the real production domain *before* running `config push` for a live environment, otherwise auth email links (confirmation, password reset) will redirect to the wrong place — the same redirect-URL mismatch bug fixed locally for `/onboarding`.
