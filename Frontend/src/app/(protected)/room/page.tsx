'use client'
import RoomCard from '@/components/room/RoomCard'
import { userAtom } from '@/lib/atoms/UserAtom'
import { Domain } from '@/lib/Domain'
import UseAuth from '@/lib/hooks/UseUser'
import { RoomGetData } from '@/lib/interface/INTERFACE'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const {loading,authenticated} =UseAuth()
    const [userId] = useAtom(userAtom)
    const router = useRouter()
    const [roomData,setroomData] = useState<RoomGetData>()
    useEffect(()=>{
        const fetchRoomdata =async ()=>{
            const fethed_data =await axios.get(`${Domain}/api/v1/room/user-room-data`,{
                params:{
                    userId:userId
                }
            })
            setroomData(fethed_data.data.data)
        }
        fetchRoomdata()
    },[])
    console.log(roomData);
  return (
<div className="p-5 flex flex-col gap-4 h-full ">
        <div className="text-2xl">
          My Rooms
        </div>
        <div className='flex justify-start items-start w-full flex-col gap-7 pt-4 pl-4'>
            <div className='text-2xl font-bold'>
                Room as owner 
            </div>
            <div className='flex justify-start items-center w-full pl-2'>

            {
                roomData?.data_as_owner && roomData.data_as_owner?.map((item,index)=>(
                    <RoomCard RoomData={item} key={index}/>
                ))
            }
            </div>
        </div>
        <div className='flex justify-start items-start w-full flex-col gap-7 pt-4 pl-4'>
            <div className='text-2xl font-bold'>
                Room as member 
            </div>
            <div className='flex justify-start items-center w-full pl-2'>

            {
                roomData?.data_as_member && roomData.data_as_member?.map((item,index)=>(
                    <RoomCard RoomData={item} key={index}/>
                ))
            }
            </div>
        </div>
      </div>
  )
}

export default page
