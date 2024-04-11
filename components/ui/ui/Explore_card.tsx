import React from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "./card";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Button, buttonVariants } from "./button";
import {
  EllipsisVertical,
  EyeIcon,
  Heart,
  MessageSquareTextIcon,
} from "lucide-react";
import { Separator } from "./separator";
interface exploreCard {
  avatar: string;
  name: string;
  fallback: string;
  time: string;
  description: string;
  images: string[];
  likes: string;
  views: string;
  className: string;
}


const Explore_card = ({avatar,name,fallback,time,description,images,likes,views,className}:exploreCard) => {
  return (
    <div>
          <Card className={`py-4 px-6 bg-[#DFEBFF] mx-16 my-10 rounded-2xl h-fit ${className}`}>
            <CardHeader className="flex flex-row items-center gap-x-4">
              <div id="profile_image">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
              </div>
              <div id="profile_name">
                {name}
                <div id="time" className="text-[13px] text-gray-500">
                  {time}
                </div>
              </div>
              <div className="flex-grow flex justify-end">
                <Button
                  onClick={() => console.log("cliked")}
                  className="bg-transparent text-black hover:bg-[#d8e5fc] border border-black rounded-3xl w-13 h-13 p-[3px]"
                >
                  <EllipsisVertical />
                </Button>
              </div>
            </CardHeader>
            <CardDescription className="text-black font-mukta text-md px-6">
              {description}
            </CardDescription>
            <CardContent>
              <div id="image" className="flex w-full pt-3">
                {images.map((img) => {
                  return (
                    <>
                      <img
                        src={img}
                        alt=""
                        className="h-36 w-20 rounded-md object-cover"
                      />
                      <Separator className="w-6" />
                    </>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="gap-8">
              <div id="views" className="flex items-center text-gray-500">
                <EyeIcon className="pr-2" />{" "}
                <p id="view_number" className="text-[14px]">
                  {views}
                </p>
              </div>
              <div id="like" className="flex items-center text-gray-500">
                <Heart className=" pr-2" />
                <p className="text-[14px]">Like</p>
              </div>
              <div id="comments" className="flex items-center text-gray-500">
                <MessageSquareTextIcon className=" pr-2" />
                <p className="text-[14px]">Comments</p>
              </div>
            </CardFooter>
          </Card>
    </div>
  );
};

export default Explore_card;
