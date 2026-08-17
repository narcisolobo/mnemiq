import UpdatePassword from "@/views/update-password/UpdatePassword";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Update Password — mnemIQ",
  description: "Choose a new password for your mnemIQ account.",
};

function UpdatePasswordPage() {
  return <UpdatePassword />;
}

export default UpdatePasswordPage;

export { metadata };
