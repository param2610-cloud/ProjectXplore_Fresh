import { FrontendDomain } from '../../../lib/Domain'
import { Rooms } from '../../../lib/interface/INTERFACE'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link'
import { ThumbsUp } from 'lucide-react'

const RoomCard = ({RoomData,mode}:{RoomData:Rooms,mode:string}) => {
  if(mode=='owner'){

    return (
      <div className='w-[15%] hover:shadow-xl '>
    <Link href={`${FrontendDomain}/room/${RoomData.room_id}`} className='w-full'>
    <Card className=''>
        <CardHeader className='text-xl font-bold'>
            {RoomData.room_name}
        </CardHeader>
        <CardContent>
          <div className='p-4 text-gray-500'>
            {RoomData.objective}
          </div>
          
        </CardContent>
    </Card>
    </Link>
    </div>
  )
}else if (mode==='member'&& RoomData.rooms){
  return (
    <div className='w-[15%] hover:shadow-xl '>
  <Link href={`${FrontendDomain}/room/${RoomData.room_id}`} className='w-full'>
  <Card className=''>
      <CardHeader className='text-xl font-bold'>
          {RoomData.rooms.room_name}
      </CardHeader>
      <CardContent>
        <div className='p-4 text-gray-500'>
          {RoomData.rooms.objective}
        </div>
        
      </CardContent>
  </Card>
  </Link>
  </div>
)
}
}

export default RoomCard
