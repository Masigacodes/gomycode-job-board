"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export function LogoutButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign out</button>
      </>
    );
  }
  return "";
}
