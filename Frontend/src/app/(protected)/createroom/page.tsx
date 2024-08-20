'use client'
import CreateRoom from '@/components/CreateRoom'
import useAuth from '@/lib/hooks/useUser';
import React from 'react'

const page = () => {
    const { loading, authenticated } = useAuth();
  return (
    <CreateRoom/>
  )
}

export default page
