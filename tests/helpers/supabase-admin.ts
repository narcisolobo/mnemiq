import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to run auth E2E tests.",
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function createConfirmedUser(email: string, password: string) {
  const { data, error } = await createAdminClient().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) throw error;
  return data.user;
}

// Bypasses actual email delivery to get a verifiable token_hash for an
// auth flow (signup confirmation, recovery, etc). This proves the app's
// own /auth/confirm route and destination page work — it does NOT prove
// the real email template points at the right place, since that's a
// separate send path. See notes/pre-deployment.md.
async function generateTokenHash(
  type: "signup" | "recovery",
  email: string,
  password?: string,
) {
  const { data, error } = await createAdminClient().auth.admin.generateLink({
    type,
    email,
    password: password ?? crypto.randomUUID(),
  });

  if (error) throw error;
  return data.properties.hashed_token;
}

export { createConfirmedUser, generateTokenHash };
