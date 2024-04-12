import React from 'react'
import { ShortsCard } from '../ui/ui/ShortsCard'
import { ScrollArea, ScrollBar } from "@/components/ui/ui/scroll-area"

const Explore_updates = () => {
  return (
    <>
                <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
                <div className=" text-[20px] leading-[25px] font-kanit pl-6 font-bold text-[#DF5173]">
                  Updates
                </div>
      <div className="flex w-max space-x-4 p-4">
          <figure key="1" className="shrink-0">
            <div className="overflow-hidden rounded-md pb-4">
            <ShortsCard
                      Title="Parambrata..."
                      image_name="thumb1.jpg"
                      className="w-[7vw] h-[9vw] mx-3 shadow-lg shadow-[#DF5173] border border-gray-200 rounded-2xl"
                      profile_image="my_image.jpg"
                    />
            </div>  
          </figure>
          <figure key="1" className="shrink-0">
            <div className="overflow-hidden rounded-md pb-4">
            <ShortsCard
                      Title="Jeet..."
                      image_name="thumb1.jpg"
                      className="w-[7vw] h-[9vw] mx-3 shadow-lg shadow-[#DF5173] border border-gray-200 rounded-2xl"
                      profile_image="my_image.jpg"
                    />
            </div>  
          </figure>
          <figure key="1" className="shrink-0">
            <div className="overflow-hidden rounded-md pb-4">
            <ShortsCard
                      Title="Mrinmoy Mondal"
                      image_name="thumb1.jpg"
                      className="w-[7vw] h-[9vw] mx-3 shadow-lg shadow-[#DF5173] border border-gray-200 rounded-2xl"
                      profile_image="my_image.jpg"
                    />
            </div>  
          </figure>
          <figure key="1" className="shrink-0">
            <div className="overflow-hidden rounded-md pb-4">
            <ShortsCard
                      Title="Parthiv Panja"
                      image_name="thumb1.jpg"
                      className="w-[7vw] h-[9vw] mx-3 shadow-lg shadow-[#DF5173] border border-gray-200 rounded-2xl"
                      profile_image="my_image.jpg"
                    />
            </div>  
          </figure>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </>
  )
}

export default Explore_updates
