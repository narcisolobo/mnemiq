"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../shared/DefaultAvatar";

function UserMenu() {
  const { profile, signOut } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div className="avatar cursor-pointer" tabIndex={0} role="button">
        <div className="w-8 rounded-full">
          {profile?.avatar ? (
            <Image
              src={profile.avatar}
              alt={`${profile?.username ?? "User"} avatar`}
              width={32}
              height={32}
            />
          ) : (
            <DefaultAvatar />
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 border-neutral z-50 w-48 border-2 p-2 shadow-md"
      >
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
        <li>
          <button onClick={signOut}>Sign out</button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
