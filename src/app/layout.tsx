import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { httpBatchLink } from "@trpc/client";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({ links: [httpBatchLink({ url: "http://localhost:4000/trpc" })] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
