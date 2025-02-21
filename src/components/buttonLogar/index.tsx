"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function ButtonLogin() {
  const { status, data } = useSession();

  async function handleSing() {
    await signIn();
  }

  function handleEnter() {
    redirect("/chatbot");
  }

  return (
    <>
      {status === "unauthenticated" && (
        <button
          className="flex items-center justify-center border rounded-full px-3 py-2 bg-red-800 text-white font-semibold "
          onClick={handleSing}
        >
          Login
        </button>
      )}
      {status === "authenticated" && (
        <button
          className="flex items-center justify-center border rounded-full px-3 py-2 bg-red-800 text-white font-semibold"
          onClick={handleEnter}
        >
          Entrar
        </button>
      )}
    </>
  );
}
