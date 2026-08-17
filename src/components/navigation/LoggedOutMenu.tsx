import Link from "next/link";
import { Fragment } from "react";

function LoggedOutMenu() {
  return (
    <Fragment>
      <li>
        <Link href="/auth/sign-in">Sign In</Link>
      </li>
      <li>
        <Link href="/auth/sign-up" className="btn btn-sm btn-primary ml-2">
          Sign Up Free
        </Link>
      </li>
    </Fragment>
  );
}

export default LoggedOutMenu;
