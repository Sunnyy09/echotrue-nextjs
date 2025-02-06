"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname(); // get the current path

  const isDashboard = pathname === "/dashboard";

  return (
    <header className="w-full md:px-8 px-1 shadow-md">
      <nav className="p-4 md:p-6">
        <div className="container mx-auto flex md:flex-row justify-between items-center">
          <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
            <span className="font-pacifico text-3xl md:ml-8 ml-2">
              Echo True
            </span>
          </Link>
          {session ? (
            <div className="flex justify-center items-center">
              <div className="flex sm:flex-row flex-col-reverse items-center gap-1 sm:gap-0">
                <span className="mr-4 text-base font-medium italic">
                  Welcome, {user?.username || user?.email}
                </span>
                {!isDashboard && (
                  <Link
                    href="/dashboard"
                    className="w-24 mr-3 sm:text-base text-sm font-semibold md:w-auto sm:p-2 py-1 text-center bg-yellow-200 hover:bg-yellow-300 rounded-lg"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
              <Button
                className="w-full text-lg font-semibold md:w-auto hover:bg-black/75 sm:block hidden"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full text-lg font-medium md:w-auto hover:bg-black/75">
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
