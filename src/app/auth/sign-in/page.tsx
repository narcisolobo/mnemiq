import SignIn from "@/views/sign-in/SignIn";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Sign In — MnemIQ",
  description:
    "Sign in to your MnemIQ account. Pick up where you left off — your decks, your streak, and your progress are waiting.",
};

function SignInPage() {
  return <SignIn />;
}

export { metadata };
export default SignInPage;
