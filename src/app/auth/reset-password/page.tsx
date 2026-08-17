import ResetPassword from "@/views/reset-password/ResetPassword";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Forgot Password — mnemIQ",
  description:
    "Reset your mnemIQ password. We'll send you an email to get you back in.",
};

function ResetPasswordPage() {
  return <ResetPassword />;
}

export default ResetPasswordPage;

export { metadata };
