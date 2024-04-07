"use client";
import react, { ReactNode } from "react";
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import STATES from "@/lib/utils/constants";

export default function MainLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {


const pathname =usePathname()
// const {User,userUid,STATE} = useUser()

















  return (
    <>
    {pathname && pathname.includes("/auth") ? (
        children
    ) : (
        <>
            <Link href="/auth/signin">Sign In</Link>
            <Link href="/auth/signup">Sign Up</Link>
            Landing Page
        </>
    )}
</>

  );
}
