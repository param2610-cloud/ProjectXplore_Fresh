'use client';
import userAtom from '@/lib/atoms/UserAtom';
import UseAuth from '@/lib/hooks/UseAuth';
import { useAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const Page = () => {
    const {} = UseAuth()
    const router = useRouter()
    const [userId] = useAtom(userAtom);
    useEffect(()=>{
        if(userId){
            router.push(`/yourprofile/${userId}`)
        }
    },[userId])
  return (
    <div>
      Loading
    </div>
  )
}

export default Page
