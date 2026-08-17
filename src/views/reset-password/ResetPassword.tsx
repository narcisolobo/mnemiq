"use client";

import {
  resetPassword,
  ResetPasswordFormState,
} from "@/app/auth/reset-password/action";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useActionState } from "react";

const initialState: ResetPasswordFormState = {};

function ResetPassword() {
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );

  return (
    <section className="text-base-content">
      <div className="space-y-8 px-6 md:space-y-12">
        <h1 className="fluid-lg font-display text-center leading-none uppercase">
          Reset Your Password.
        </h1>
        <div className="space-y-4">
          <div className="card bg-base-200 mx-auto w-full max-w-135 min-w-90 shadow-lg">
            <div className="card-body">
              <form action={formAction}>
                {state.authError && (
                  <div role="alert" className="alert alert-error mb-4">
                    {state.authError}
                  </div>
                )}
                {state.success && (
                  <div role="alert" className="alert alert-success mb-4">
                    {state.success}
                  </div>
                )}
                <fieldset className="fieldset mb-4">
                  <label htmlFor="email" className="input w-full">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="grow"
                      placeholder="Email address"
                      required
                    />
                  </label>
                  {state.errors?.email && (
                    <p className="label text-error">{state.errors.email[0]}</p>
                  )}
                </fieldset>
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-primary shadow-lg"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
