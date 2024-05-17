import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Contextlayout from "./contextlayout";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectXplore",
  description: "Created by Parambrata Ghosh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} p-0 m-0 w-screen overflow-x-hidden`}>
       
        <Contextlayout>
          
          {children}
        </Contextlayout>
        
      </body>
    </html>
  );
}
