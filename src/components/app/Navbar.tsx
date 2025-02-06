"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <header className="w-full px-8 shadow-md">
      <nav className="p-4 md:p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
            <span className="font-pacifico text-3xl ml-8">Echo True</span>
          </Link>
          {session ? (
            <div>
              <span className="mr-4 text-base font-medium italic">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                className="w-full text-lg font-semibold md:w-auto hover:bg-black/75"
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
