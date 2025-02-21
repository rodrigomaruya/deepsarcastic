"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderCircle, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }
  return (
    <header className="w-full max-w-7xl mx-auto h-20">
      <div className="flex items-center justify-between px-3 h-full">
        <Link href={"/"}>
          <h1 className="text-3xl md:text-4xl font-bold">
            Deep<span className="text-red-800">Sarcastic</span>
          </h1>
        </Link>
        {status === "loading" && (
          <button className="animate-spin">
            <LoaderCircle size={24} />
          </button>
        )}
        {status === "unauthenticated" && (
          <button
            className="flex items-center justify-center border rounded-full p-2 "
            onClick={handleLogin}
          >
            <User />
          </button>
        )}
        {status === "authenticated" && (
          <div className="flex items-center justify-center gap-3 ">
            <Avatar>
              <AvatarImage src={data.user.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button onClick={handleLogout}>
              <LogOutIcon />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
