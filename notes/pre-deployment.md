# Pre-Deployment Checklist

Things to revisit in `supabase/config.toml` before deploying to a production environment (see [supabase-push.md](./supabase-push.md) for the deploy workflow itself).

## `[auth.rate_limit]`

`email_sent` was bumped from its default of `2` to `30` during local development, to avoid hitting the cap while repeatedly testing sign-up. That's too permissive for production — it caps how many auth emails (confirmation, password reset, etc.) can be sent per hour, and a high value makes email-bombing a single address, or spamming sign-ups generally, cheaper for an attacker.

- [ ] Reconsider `email_sent` before going live — dial it back down to something sane for real traffic (not necessarily back to `2`; that was itself just the local-mailer default, not a considered production value).
- [ ] Review the rest of `[auth.rate_limit]` (`sign_in_sign_ups`, `token_refresh`, `token_verifications`, `anonymous_users`, `web3`) — currently all at their scaffolded defaults, not yet evaluated against expected production traffic.

## `[auth.email.smtp]`

Disabled (`enabled = false`) so local dev/CI use the built-in Mailpit catcher instead of sending real email — Resend rejects unverified-domain recipients (so `@example.com` test addresses fail), its send-only API key can't read back sent content for verification, and its rate limit isn't meant for repeated automated test runs. The Resend host/user/`admin_email`/`sender_name` values are left in place, just switched off.

- [ ] Set `enabled = true` before deploying — without it, the hosted project has no real email delivery (no signup confirmations, no password resets).
- [ ] Confirm `admin_email` is still a real address on a domain verified in Resend.
- [ ] Set `RESEND_API_KEY` as a secret on the hosted project (`supabase secrets set`) — it won't carry over from local `.env.local`. See [supabase-push.md](./supabase-push.md).
