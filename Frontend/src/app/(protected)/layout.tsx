
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "./clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectXplore",
  description: "Created by Parambrata Ghosh ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={inter.className}>
        <ClientLayout>
        {children}
        </ClientLayout>
        <Toaster/>
        </div>
  );
}
