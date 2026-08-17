"use server";

import { updatePasswordSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

interface UpdatePasswordFormState {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
  };
  authError?: string;
}

async function updatePassword(
  _prevState: UpdatePasswordFormState,
  formData: FormData,
): Promise<UpdatePasswordFormState> {
  const parsed = updatePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const { password } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { authError: error.message };
  }

  redirect("/profile");
}

export { updatePassword, type UpdatePasswordFormState };
