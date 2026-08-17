"use client";

import { signIn, type SignInFormState } from "@/app/auth/sign-in/action";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useActionState } from "react";

const initialState: SignInFormState = {};

function SignIn() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <section className="text-base-content">
      <div className="space-y-8 px-6 md:space-y-12">
        <h1 className="fluid-lg font-display text-center leading-none uppercase">
          Sign In.
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
                <fieldset className="fieldset">
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
                <fieldset className="fieldset mb-4">
                  <label htmlFor="password" className="input w-full">
                    <FontAwesomeIcon icon={faLock} size="lg" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="grow"
                      placeholder="Password"
                      required
                    />
                  </label>
                  {state.errors?.password && (
                    <p className="label text-error">
                      {state.errors.password[0]}
                    </p>
                  )}
                </fieldset>
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-primary shadow-lg"
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mx-auto w-full max-w-135 min-w-90 text-right">
            <Link href="/auth/reset-password" className="link-hover text-xs">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
