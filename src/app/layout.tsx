"use client";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { httpLink } from "@trpc/client";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({ links: [httpLink({ url: "http://localhost:4000/trpc" })] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${redHatDisplay.variable} antialiased`}>
          <QueryClientProvider client={queryClient}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <SignedIn>
                {/* Content for signed-in users */}
                <UserButton />
                {children}
              </SignedIn>
              <SignedOut>
                {/* Content for signed-out users */}
                <div className="flex justify-center items-center h-screen">
                  <div>
                    <h1 className="text-2xl font-bold">Welcome! Please sign in to continue.</h1>
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
