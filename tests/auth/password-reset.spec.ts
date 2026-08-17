import { test, expect } from "@playwright/test";
import { createConfirmedUser, generateTokenHash } from "../helpers/supabase-admin";

test("reset request, recovery link, and new password reach /profile", async ({
  page,
}) => {
  // See sign-up.spec.ts for why this needs a resend.dev address rather
  // than a made-up one — Resend rejects unverified-domain recipients.
  const email = `delivered+e2e-reset-${Date.now()}@resend.dev`;
  await createConfirmedUser(email, "Abcdef1!");

  await page.goto("/auth/reset-password");
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByRole("button", { name: "Reset Password" }).click();

  await expect(
    page.getByText("Check your email for a link to reset your password."),
  ).toBeVisible();

  // Bypasses real email delivery — see helpers/supabase-admin.ts for why
  // this doesn't prove the actual recovery email template is correct.
  const tokenHash = await generateTokenHash("recovery", email);
  await page.goto(
    `/auth/confirm?token_hash=${tokenHash}&type=recovery&next=/auth/update-password`,
  );

  await expect(
    page.getByRole("heading", { name: "Update Your Password." }),
  ).toBeVisible();

  await page
    .getByPlaceholder("New password", { exact: true })
    .fill("NewPassw0rd!");
  await page.getByPlaceholder("Confirm new password").fill("NewPassw0rd!");
  await page.getByRole("button", { name: "Update Password" }).click();

  await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
});
