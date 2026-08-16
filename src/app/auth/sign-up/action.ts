"use server";

import { signUpSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { z } from "zod";

interface SignUpFormState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  emailTaken?: boolean;
  success?: boolean;
}

async function signUpNewUser(
  _prevState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/onboarding`,
    },
  });

  if (error) {
    return {
      errors: { email: [error.message] },
      emailTaken: error.code === "user_already_exists",
    };
  }

  return { success: true };
}

export { signUpNewUser };
export type { SignUpFormState };
