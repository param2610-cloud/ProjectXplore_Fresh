import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/ui/carousel";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/ui/avatar";
import { Button, buttonVariants } from "../ui/ui/button";
import {
  EllipsisVertical,
  EyeIcon,
  Heart,
  MessageSquareTextIcon,
} from "lucide-react";
import { Separator } from "../ui/ui/separator";
import Commentbar from "../ui/ui/Commentbar";
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

const Explore_card = ({
  avatar,
  name,
  fallback,
  time,
  description,
  images,
  likes,
  views,
  className,
}: exploreCard) => {
  const [Heartclicked, setHeartClicked] = useState(false);
  const [Comment, showComment] = useState(false);
  function handleClick(event: any) {
    setHeartClicked(!Heartclicked);
  }
  return (
    <div>
      <Card
        className={` bg-[#DFEBFF] min-[1350px]:w-[550px] min-[1920px]:w-[650px] w-[400px] h-fit my-[50px] rounded-2xl max-[390px]:w-[350px]  ${className}`}
      >
        <CardHeader className="flex flex-row items-center gap-x-4 border-b border-black">
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
        <CardDescription className="text-black font-mukta text-md px-6 py-6">
          {description}
        </CardDescription>
        <CardContent>
          <div className="flex w-full pt-3">
            <Carousel className="">
              <CarouselContent>
                {images.map((img) => {
                  let i = 0;
                  return (
                    <CarouselItem key={i++}>
                      <img
                        src={img}
                        alt=""
                        className="rounded-md object-cover"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="gap-8 text-sm w-[550px] max-[390px]:w-[350px] flex justify-between min-[1920px]:w-[650px] border-t border-black items-center pt-4 px-6">
            
          <div id="views" className="flex items-center text-gray-500 ">
            <EyeIcon className="mr-[2px]" size={13} />{" "}
            <p id="view_number" className="">
              {views}
            </p>
          </div>
          <div>
            {" "}
            {Heartclicked ? (
              <Heart
                size={24}
                className="text-[#FF0046] ml-4"
                fill="#FF0046"
                onClick={handleClick}
              />
            ) : (
              <Heart size={24} onClick={handleClick} className="ml-4" />
            )}
          </div>
          <button
            id="comments"
            className="flex items-center text-gray-500 cursor-pointer"
            onClick={() => showComment(!Comment)}
            >
            <MessageSquareTextIcon className=" mr-2" size={17} />
            <p className="text-[14px]">Comments</p>
          </button>
            </div>
            <div>
          {Comment ? <Commentbar /> : ""}
            </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Explore_card;
