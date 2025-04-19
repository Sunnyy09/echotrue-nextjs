"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

function Navbar() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname(); // get the current path

  const isDashboard = pathname === "/dashboard";

  const handleSignOut = async () => {
    setIsSubmitting(true);
    try {
      // Simulate a delay to show loading state (optional)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // await signOut()
      // or
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out failed", error);
      setIsSubmitting(false);
    }
  };

  return (
    <header className="w-full md:px-8 px-1 shadow-md">
      <nav className="p-4 md:p-6">
        <div className="container mx-auto flex md:flex-row justify-between items-center">
          <Link href="/" className="text-xl font-bold">
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
                className="w-full text-lg font-semibold w-auto hover:bg-black/75"
                onClick={handleSignOut}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="text-sm flex">
                      {" "}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      wait...
                    </span>
                  </>
                ) : (
                  <LogOut size={48} strokeWidth={2.25} />
                )}
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
