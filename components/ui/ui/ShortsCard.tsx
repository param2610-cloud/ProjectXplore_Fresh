import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/ui/avatar";
interface ShortsCardProps {
  Title: string;
  image_name: string;
  className: string;
  profile_image: string;
}

export function ShortsCard({
  Title,
  image_name,
  profile_image,
  className,
}: ShortsCardProps) {
  return (
    <div
      className={`bg-cover bg-start flex items-end ${className} cursor-pointer`}
      style={{ backgroundImage: `url(${image_name})` }}
    >
      <div
        id="title"
        className="h-[22px] bg-white mb-[4px] rounded-2xl shadow-lg flex items-center justify-start   border border-gray-200 ml-[4px] "
      >
        <Avatar className="relative m-[1px] h-4 w-4 mr-[2px]">
          <AvatarImage src={profile_image} />
        </Avatar>
        <div className="">
          <p className="text-[10px] font-extrabold">{Title}</p>
        </div>
      </div>
    </div>
  );
}
