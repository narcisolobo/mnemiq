"use client";

import {
  updatePassword,
  UpdatePasswordFormState,
} from "@/app/auth/update-password/action";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useActionState } from "react";

const initialState: UpdatePasswordFormState = {};

function UpdatePassword() {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState,
  );

  return (
    <section className="text-base-content">
      <div className="space-y-8 px-6 md:space-y-12">
        <h1 className="fluid-lg font-display text-center leading-none uppercase">
          Update Your Password.
        </h1>
        <div className="card bg-base-200 mx-auto w-full max-w-135 min-w-90 shadow-lg">
          <div className="card-body">
            <form action={formAction}>
              {state.authError && (
                <div role="alert" className="alert alert-error mb-4">
                  {state.authError}
                </div>
              )}
              <fieldset className="fieldset">
                <label htmlFor="password" className="input w-full">
                  <FontAwesomeIcon icon={faLock} size="lg" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="grow"
                    placeholder="New password"
                    required
                  />
                </label>
                {state.errors?.password?.map((message) => (
                  <p key={message} className="label text-error">
                    {message}
                  </p>
                ))}
              </fieldset>
              <fieldset className="fieldset mb-4">
                <label htmlFor="confirmPassword" className="input w-full">
                  <FontAwesomeIcon icon={faLock} size="lg" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="grow"
                    placeholder="Confirm new password"
                    required
                  />
                </label>
                {state.errors?.confirmPassword && (
                  <p className="label text-error">
                    {state.errors.confirmPassword[0]}
                  </p>
                )}
              </fieldset>
              <div className="text-right">
                <button
                  type="submit"
                  className="btn btn-primary shadow-lg"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdatePassword;
