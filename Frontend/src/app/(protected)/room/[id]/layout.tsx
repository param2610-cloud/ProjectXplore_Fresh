
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Datalayout from "./datalayout";

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
    // <html lang="en">
      <div className={inter.className}>
        <Datalayout>
        {children}
        <Toaster/>
        </Datalayout>
        </div>
    // </html>
  );
}
