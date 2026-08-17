import { test, expect } from "@playwright/test";
import { generateTokenHash } from "../helpers/supabase-admin";

test("sign-up form succeeds and shows the check-your-email state", async ({
  page,
}) => {
  // Resend rejects sends to made-up domains like example.com outright
  // (550 "Invalid `to` field") unless a verified sending domain is
  // configured. delivered@resend.dev is Resend's own address for
  // simulating a successful delivery without one.
  const email = `delivered+e2e-signup-${Date.now()}@resend.dev`;

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
