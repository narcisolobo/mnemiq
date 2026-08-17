import { test, expect } from "@playwright/test";
import { generateTokenHash } from "../helpers/supabase-admin";
import { createAnonClient } from "../helpers/supabase-client";
import { waitForEmail } from "../helpers/mailpit";

test("sign-up form succeeds and shows the check-your-email state", async ({
  page,
}) => {
  const email = `e2e-signup-${Date.now()}@example.com`;

  await page.goto("/auth/sign-up");
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByPlaceholder("Password").fill("Abcdef1!");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await expect(
    page.getByText("Check your inbox to confirm your email address."),
  ).toBeVisible();
});

test("confirmation link signs the user in and lands on /onboarding", async ({
  page,
}) => {
  // Bypasses real email delivery — see helpers/supabase-admin.ts for why
  // this doesn't prove the actual email template is correct.
  const email = `e2e-confirm-${Date.now()}@example.com`;
  const tokenHash = await generateTokenHash("signup", email, "Abcdef1!");

  await page.goto(
    `/auth/confirm?token_hash=${tokenHash}&type=email&next=/onboarding`,
  );

  await expect(
    page.getByRole("heading", { name: "Onboarding Page" }),
  ).toBeVisible();
});

test("the real confirmation email links to emailRedirectTo", async () => {
  // Unlike the test above, this calls the real public signUp() and
  // reads the actual sent email from Mailpit, so it proves what a real
  // user's confirmation link contains — not just that our own
  // /auth/confirm route works once it has a valid token.
  const email = `e2e-redirect-${Date.now()}@example.com`;

  const { error } = await createAnonClient().auth.signUp({
    email,
    password: "Abcdef1!",
    options: { emailRedirectTo: "http://127.0.0.1:3000/onboarding" },
  });
  if (error) throw error;

  const html = await waitForEmail(email);
  const match = html.match(/href="([^"]*\/auth\/confirm\?[^"]*)"/);
  expect(match, "confirmation link not found in email").toBeTruthy();

  const confirmUrl = new URL(match![1].replace(/&amp;/g, "&"));
  expect(confirmUrl.searchParams.get("next")).toBe(
    "http://127.0.0.1:3000/onboarding",
  );
});
