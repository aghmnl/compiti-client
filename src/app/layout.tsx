"use client";
import "./globals.css";
import { trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react"; // Import useState
import { httpLink } from "@trpc/client";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = trpc.createClient({
    links: [httpLink({ url: `${serverUrl}/trpc` })],
  });

  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="bg-background text-foreground antialiased">
          <QueryClientProvider client={queryClient}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <SignedIn>
                <UserButton />
                {children}
              </SignedIn>
              <SignedOut>
                <div className="flex h-screen items-center justify-center">
                  <div>
                    <h1 className="text-2xl font-bold">
                      Welcome to Compiti! Please sign in to continue.
                    </h1>
                    <SignInButton />
                  </div>
                </div>
              </SignedOut>
            </trpc.Provider>
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
