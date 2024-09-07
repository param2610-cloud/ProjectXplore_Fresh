"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "../../../lib/utils"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Domain } from "../../../lib/Domain"
import { useAtom } from "jotai"
import UserAtom from "../../../lib/atoms/UserAtom"
import UseAuth from "../../../lib/hooks/UseAuth"

interface Framework {
  value: string
  label: string
}

interface Room {
  id: number;
  name: string;
  objective: string | null;
  authorId: number;
}

interface UserRoomsResponse {
  authoredRooms: Room[];
  memberRooms: Room[];
}
interface ComboboxDemoProps {
  frameworks: Framework[]
  placeholder: string
  defaultValue?: string
  onValueChange: (value: string) => void
  setCreateRoomClick: React.Dispatch<React.SetStateAction<boolean>>
}

export function ComboboxDemo({
  frameworks,
  placeholder,
  defaultValue = "",
  onValueChange,
  setCreateRoomClick
}: ComboboxDemoProps) {
  const [user] = useAtom(UserAtom);
  React.useEffect(() => {
    // Fetch rooms from API
    const fetchRooms = async () => {
      try {
        
        if(user){
          const response = await axios.get(`${Domain}/api/v1/room/get-all-room`,{params:{userId:user}}) 
          setRooms(response.data)
        }
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }
  
    fetchRooms()
  }, [user])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)
  const [User, setUser] = React.useState<any>()
  const [rooms, setRooms] = React.useState<UserRoomsResponse>()
  const router = useRouter();
  React.useEffect(()=>{
    console.log(rooms)
  },[rooms])

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])


  const handleValueChange = (currentValue: string) => {
    setValue(currentValue)
    onValueChange(currentValue)
    setOpen(false)
  }

  const handleItemClick = (currentValue: string) => {
    handleValueChange(currentValue)
  }

  const handleClickRoom = () => {
    router.push('/createroom')
  }

  const handleRoomClick = (roomId: number) => {
    router.push(`/room/${roomId}/home`)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between"
          onClick={() => setOpen(!open)}
        >
          
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-0">
        <DropdownMenuLabel>{placeholder}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleClickRoom}
          className="flex items-center cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Room
        </DropdownMenuItem>
        {rooms?.authoredRooms.map((room) => (
          <DropdownMenuItem
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="flex items-center cursor-pointer"
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === room.name ? "opacity-100" : "opacity-0"
              )}
            />
            {room.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
