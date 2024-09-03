'use client'
import CreateRoom from '@/components/CreateRoom'
import UseAuth from '@/lib/hooks/UseAuth';
import React from 'react'

const page = () => {
    const { loading, authenticated } = UseAuth();
  return (
    <CreateRoom/>
  )
}

export default page
