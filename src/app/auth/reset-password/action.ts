"use server";

import { forgotPasswordSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

interface ResetPasswordFormState {
  errors?: {
    email?: string[];
  };
  authError?: string;
  success?: string;
}

async function resetPassword(
  _prevState: ResetPasswordFormState,
  formData: FormData,
): Promise<ResetPasswordFormState> {
  const parsed = forgotPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const { email } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { authError: error.message };
  }

  return { success: "Check your email for a link to reset your password." };
}

export { resetPassword, type ResetPasswordFormState };
