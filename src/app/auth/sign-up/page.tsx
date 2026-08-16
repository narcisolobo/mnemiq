import SignUp from "@/views/sign-up/SignUp";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Sign Up — MnemIQ",
  description:
    "Create your free MnemIQ account and start studying smarter today. Science-backed spaced repetition, community decks, and gamification that actually makes you want to show up.",
};

function SignUpPage() {
  return <SignUp />;
}

export { metadata };
export default SignUpPage;
