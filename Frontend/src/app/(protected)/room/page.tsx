'use client'
import RoomCard from '@/components/room/RoomCard'
import { Button } from '@/components/ui/button'
import { userAtom } from '@/lib/atoms/userAtom'
import { Domain } from '@/lib/Domain'
import UseAuth from '@/lib/hooks/UseAuth'
import { RoomGetData } from '@/lib/interface/INTERFACE'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from '@/components/ui/input'

const RoomPage = () => {
    const {loading, authenticated} = UseAuth()
    const [userId] = useAtom(userAtom)
    const router = useRouter()
    const [roomData, setRoomData] = useState<RoomGetData>()
    const [link,setlink]=useState<string>('')

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const fetchedData = await axios.get(`${Domain}/api/v1/room/user-room-data`, {
                    params: { userId }
                })
                setRoomData(fetchedData.data.data)
            } catch (error) {
                console.error('Error fetching room data:', error)
            }
        }

        if (userId) {
            fetchRoomData()
        }
    }, [userId])

    console.log(roomData);
    

    return (
        <div className="p-5 flex flex-col gap-4 h-full ">
            <div className='flex w-full justify-between items-center'>

            <div className="text-2xl">
                My Rooms
            </div>
            <div className='flex items-center gap-5'> 

            <Button onClick={()=>router.push("/room/create")}>Create a Room</Button>
            <div>
            <Popover>
  <PopoverTrigger><Button className='bg-green-500 hover:bg-green-700'>Join Rooms</Button></PopoverTrigger>
  <PopoverContent>
    <div className='flex items-center gap-5'>
        <Input placeholder='Link' className='focus:border-green-500' value={link} onChange={(e:any)=>setlink(e.target.value)}/>
        <Button onClick={()=>{
            const parts = link.split("/")
            const freshLink = parts[2]+'/'+parts[3]
            router.push(freshLink)
        }}>Join</Button>
    </div>
    </PopoverContent>
</Popover>
        </div>
                
            </div>
            </div>
            <div className='flex justify-start items-start w-full flex-col gap-7 pt-4 pl-4'>
                <div className='text-2xl font-bold'>
                    Room as owner 
                </div>
                <div className='flex justify-start items-center w-full pl-2 gap-5'>
                    {roomData?.data_as_owner?.map((item, index) => (
                        <RoomCard RoomData={item} key={index} mode='owner'/>
                    ))}
                </div>
            </div>
            <div className='flex justify-start items-start w-full flex-col gap-7 pt-4 pl-4'>
                <div className='text-2xl font-bold'>
                    Room as member 
                </div>
                <div className='flex justify-start items-center w-full pl-2 gap-5'>
                    {roomData?.data_as_member?.map((item, index) => (
                        <RoomCard RoomData={item} key={index} mode='member'/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RoomPage