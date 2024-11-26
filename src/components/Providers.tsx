"use client";
import { auth } from "@/auth/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const session = auth;
  return <SessionProvider session = {session}>{children}</SessionProvider>;
}
