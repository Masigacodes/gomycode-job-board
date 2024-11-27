"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export function LogoutButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sign out</button>
      </>
    );
  }
  return "";
}
