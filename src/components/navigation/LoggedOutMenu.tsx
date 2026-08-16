import Link from "next/link";

function LoggedOutMenu() {
  return (
    <ul className="menu menu-horizontal items-center">
      <li>
        <Link href="/auth/sign-in">Sign In</Link>
      </li>
      <li>
        <Link href="/auth/sign-up" className="btn btn-sm btn-primary">
          Sign Up Free
        </Link>
      </li>
    </ul>
  );
}

export default LoggedOutMenu;
