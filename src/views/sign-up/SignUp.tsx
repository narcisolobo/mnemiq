"use client";

import { signUpNewUser, type SignUpFormState } from "@/app/auth/sign-up/action";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useActionState } from "react";

const initialState: SignUpFormState = {};

function SignUp() {
  const [state, formAction, isPending] = useActionState(
    signUpNewUser,
    initialState,
  );

  return (
    <section className="text-base-content">
      <div className="space-y-8 px-6 md:space-y-12">
        <h1 className="fluid-lg font-display text-center leading-none uppercase">
          Sign Up.
        </h1>
        {state.success ? (
          <div role="alert" className="alert alert-success mx-auto w-fit">
            Check your inbox to confirm your email address.
          </div>
        ) : (
          <div className="card bg-base-200 mx-auto w-full max-w-135 min-w-90 shadow-lg">
            <div className="card-body">
              <form action={formAction}>
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
                    <p className="label text-error">
                      {state.errors.email[0]}
                      {state.emailTaken && (
                        <>
                          {" — "}
                          <Link href="/auth/sign-in" className="link">
                            Sign in instead
                          </Link>
                        </>
                      )}
                    </p>
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
                  {state.errors?.password?.map((message) => (
                    <p key={message} className="label text-error">
                      {message}
                    </p>
                  ))}
                </fieldset>
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-primary shadow-lg"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Sign Up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SignUp;
