import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

// Anon client for exercising real public-facing auth calls (signUp,
// resetPasswordForEmail, etc.) exactly as the app does — as opposed to
// the admin client, whose privileged operations (generateLink,
// createUser) can bypass checks the public API enforces.
function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set to run auth E2E tests.",
    );
  }

  return createClient<Database>(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export { createAnonClient };
