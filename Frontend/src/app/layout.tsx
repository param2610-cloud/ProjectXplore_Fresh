import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JotaiProvider } from "@/components/JotaiProvider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "ProjectXplore",
  description: "Created BY by Parambrata Ghosh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppRouterCacheProvider>
        <JotaiProvider>
          {children}
          <Toaster/>
        </JotaiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}