import { test, expect } from "@playwright/test";
import { createConfirmedUser } from "../helpers/supabase-admin";

// A third regression was attempted here for the "confirmation link took
// me to the landing page instead of /onboarding" bug from earlier this
// session, originally diagnosed as a misconfigured
// additional_redirect_urls (wrong scheme, no wildcard). Testing it with
// real signups against Mailpit disproved that diagnosis: the "broken"
// value still produced a correct link. Since there's no known-failing
// config to guard against, a real regression test isn't possible right
// now — the actual root cause of that original bug is still unknown.
// A general (non-regression) version of the emailRedirectTo assertion
// lives in sign-up.spec.ts instead.

test("header reflects a fresh sign-in immediately, no manual refresh", async ({
  page,
}) => {
  // Bug: AuthProvider's `user` state was only ever updated by the
  // browser Supabase client's onAuthStateChange listener, which
  // subscribes once at initial page load. Sign-in happens through the
  // *server* client inside a Server Action — a separate client
  // instance — so that listener never fired for the new session. The
  // header kept showing LoggedOutMenu after a real, successful
  // sign-in until the page was manually reloaded. Fixed by fetching
  // the user server-side in the root layout on every request and
  // syncing it into AuthProvider during render.
  const email = `e2e-headersync-${Date.now()}@example.com`;
  const password = "Abcdef1!";
  await createConfirmedUser(email, password);

  await page.goto("/auth/sign-in");
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign In" })).not.toBeVisible();
  await expect(page.locator("header .avatar")).toBeVisible();
});

test("duplicate sign-up shows emailTaken error with a sign-in link", async ({
  page,
}) => {
  // Desired behavior locked in by this test: a sign-up with an
  // already-registered email must surface Supabase's
  // user_already_exists error with a "Sign in instead" link to
  // /auth/sign-in — not a generic message, and not silent success
  // (which would be an enumeration-safe posture this app doesn't
  // actually have, per the empirical test earlier this session).
  const email = `e2e-duplicate-${Date.now()}@example.com`;
  await createConfirmedUser(email, "Abcdef1!");

  await page.goto("/auth/sign-up");
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByPlaceholder("Password").fill("Abcdef1!");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await expect(page.getByText("User already registered")).toBeVisible();

  const signInLink = page.getByRole("link", { name: "Sign in instead" });
  await expect(signInLink).toBeVisible();
  await expect(signInLink).toHaveAttribute("href", "/auth/sign-in");
});
