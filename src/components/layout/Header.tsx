"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import MnemIQLogo from "../brand/MnemIQLogo";
import UserMenu from "../navigation/UserMenu";
import ThemeSwitcher from "../shared/ThemeSwitcher";
import LoggedOutMenu from "../navigation/LoggedOutMenu";

function Header() {
  const { user } = useAuth();

  return (
    <div className="bg-base-200 border-neutral flex-none border-b-4">
      <div className="max-w-8xl mx-auto px-4">
        <header className="navbar">
          <div className="flex-1">
            <Link
              href={user ? "/dashboard" : "/"}
              aria-label="Neemik logo"
              className="font-display inline-flex items-center gap-1 text-xl"
            >
              <MnemIQLogo />
            </Link>
          </div>
          <div className="flex flex-none items-center">
            {user ? <UserMenu /> : <LoggedOutMenu />}
            <div className="divider divider-horizontal" />
            <ThemeSwitcher />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
