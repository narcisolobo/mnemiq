"use server";

import { signInSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

interface SignInFormState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  authError?: string;
}

async function signIn(
  _prevState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> {
  const parsed = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { authError: "Invalid email or password" };
  }

  redirect("/profile");
}

export { signIn, type SignInFormState };
