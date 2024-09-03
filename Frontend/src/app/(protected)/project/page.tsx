'use client'
import ProjectList from '@/components/project/ProjectList'
import { userAtom } from '@/lib/atoms/UserAtom';
import UseAuth from '@/lib/hooks/UseAuth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
  const { loading, authenticated } = UseAuth();
    const [user] = useAtom(userAtom);
    const router = useRouter();
    useEffect(() => {
        // Startup loading
        
        if(user === "d0e358f6-c0c7-41a0-8f4a-2687967431ad"){
            router.push("/institution")
        }
    }, [user]);
  return (
    <div>
      <ProjectList/>
    </div>
  )
}
export default Page
