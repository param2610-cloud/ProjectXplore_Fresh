import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import UseAuth from '../../../lib/hooks/UseAuth'
import { useAtom } from 'jotai'
import userAtom from '../../../lib/atoms/UserAtom'
import axios from 'axios'
import { Domain } from '../../../lib/Domain'
import { RoomGetData, Rooms } from '../../../lib/interface/INTERFACE'
import { Button } from 'rsuite'
import { useRouter } from 'next/navigation'

const Room_list_dashboard = () => {
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
    <div>
      <Card className="flex-grow py-4 px-2">
                            <CardTitle className="text-lg flex w-full justify-between">
                                <div className='px-3 py-1 text-bold'>
                                    Rooms
                                </div>
                                <div>
                                    <Button className='bg-green-600 px-3 py-1 rounded-lg text-white  font-medium' onClick={()=>{router.push("/room/create")}}>
                                        New
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardContent className="py-4">
                                <div className="border-2 border-black rounded-lg p-1">
                                    <h1 className="text-lg font-bold">
                                        Employee Management System
                                    </h1>
                                    <p className="text-gray-400 py-2 pl-2">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit...
                                    </p>
                                    <div className="flex w-full justify-between px-2">
                                        <div className="text-red-600 font-medium">
                                            <div className="font-bold text-blue-500">
                                                Team Drona
                                            </div>
                                            <div className="pl-1">
                                                Project Manager
                                            </div>
                                        </div>
                                        <div className="text-green-500 font-medium">
                                            Backend
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
    </div>
  )
}

export default Room_list_dashboard
