"use client";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { httpLink } from "@trpc/client"; // Use httpLink instead of httpBatchLink

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({ links: [httpLink({ url: "http://localhost:4000/trpc" })] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.variable}  antialiased`}>
        <QueryClientProvider client={queryClient}>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            {children}
          </trpc.Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
