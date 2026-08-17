import { test, expect } from "@playwright/test";
import { createConfirmedUser } from "../helpers/supabase-admin";

test("sign-in redirects to /profile and updates the header", async ({
  page,
}) => {
  const email = `e2e-signin-${Date.now()}@example.com`;
  const password = "Abcdef1!";
  await createConfirmedUser(email, password);

  await page.goto("/auth/sign-in");
  await page.getByPlaceholder("Email address").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();

  // Header should reflect the new session immediately (no manual refresh) —
  // regression coverage for the stale-client-auth-state bug.
  await expect(page.getByRole("link", { name: "Sign In" })).not.toBeVisible();
  await expect(page.locator("header .avatar")).toBeVisible();
});
