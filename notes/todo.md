# TODO

## Password Reset E2E Coverage

Follow-ups for `reset-password.spec.ts`. Manual QA on the real recovery email template has already been done (2x) — not listed below.

### Missing Edge Cases

- [ ] **Invalid/malformed `token_hash`** — hitting `/auth/confirm` with a garbage token should show an error state, not crash or silently pass through
- [ ] **Expired token** — same, but for a token past its TTL
- [ ] **Token reuse** — consuming a valid token once, then attempting to reuse it should be rejected
- [ ] **Non-existent email on reset request** — submitting an email with no account should still show "Check your email for a link to reset your password." (don't leak account existence — assert this explicitly as a security property, not just a UI state)

### Recommended Double-Checks

- [ ] **Verify new password actually works** — after the update-password step, sign out and sign back in with the new password to confirm the change persisted server-side, not just that the UI redirected to `/profile`
- [ ] **Password confirm mismatch** — typo/mismatch between "New password" and "Confirm new password" fields should surface a validation error, not submit
