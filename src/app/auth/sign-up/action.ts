import { signUpSchema } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";

async function signUpNewUser(formData: FormData) {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    // return parsed.error to the form
    return;
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://example.com/welcome",
    },
  });
}

export { signUpNewUser };
