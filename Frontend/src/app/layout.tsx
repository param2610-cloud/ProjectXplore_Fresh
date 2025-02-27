import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JotaiProvider } from "@/components/JotaiProvider";
import { Analytics } from "@vercel/analytics/react"

import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "ProjectXplore",
  description: "Created BY by Parambrata Ghosh",
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/icon.svg' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProvider>
          {children}
          <Toaster/>
        </JotaiProvider>
      </body>
    </html>
  );
}