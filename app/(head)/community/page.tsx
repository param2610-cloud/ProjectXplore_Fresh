import react from "react";
import { Category } from "@/components/categorybar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/ui/card";
import { EyeIcon, Heart, MessageSquareTextIcon } from "lucide-react";
import { Avatar,AvatarFallback, AvatarImage } from "@/components/ui/ui/avatar";

export interface CategoryItem {
  id: number;
  title: string;
}

export interface contentAttribute {
  Title: string;
  Author: string;
  like: number;
  description: string;
}

const categoryList: CategoryItem[] = [
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Trending",
  },
  {
    id: 100,
    title: "AI",
  },
  {
    id: 101,
    title: "Robotics",
  },
  {
    id: 102,
    title: "VR",
  },
  {
    id: 103,
    title: "BioTech",
  },
  {
    id: 104,
    title: "Blockchain",
  },
  {
    id: 105,
    title: "Web",
  },
  {
    id: 106,
    title: "Android",
  },
];

export default function page() {
  return (
    <div id="parent_explore" className="min-h-full flex flex-col w-full">
      <div
        id="explore_heading"
        className=" pt-12 flex justify-center sm:text-4xl text-2xl  font-work_sans font-bold"
      >
        Explore <p className="text-[#DF5173] pl-2">Innovation</p>
      </div>
      <div
        id="desktop_category"
        className="sm:flex hidden justify-center mt-8   "
      >
        <Category category={categoryList} number_of_category={8} />
      </div>
      <div
        id="smartphone_category"
        className="lg:hidden md:hidden flex justify-center mt-8   "
      >
        <Category category={categoryList} number_of_category={5} />
      </div>
      <div
        id="contents"
        className="lg:grid grid-cols-2 grid-rows-3 grid-cols-[75%_1fr] pt-10"
      >
        <div id="cards" className=" row-start-1 row-end-4 col-start-1 ">
          <Card>
            <CardHeader className="flex flex-row items-center gap-x-4">
                <div id="profile_image">
                    <Avatar>
                        <AvatarImage src="my_image.jpg"/>
                        <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                </div>
                <div id="profile_name">
                    Parambrata Ghosh
                    <div id="time" className="text-sm">
                    5 hours ago
                </div>
                </div>
                
            </CardHeader>
            <CardDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos rerum inventore nulla necessitatibus eius. Omnis,
              cumque mollitia quisquam inventore veritatis libero dolorem
              aperiam laborum. Quaerat animi quisquam dignissimos assumenda
              eligendi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit quis laborum animi sunt accusamus, voluptatum tempore! Praesentium doloribus deleniti quisquam. Doloribus impedit velit temporibus. Tempore sit ipsum veniam! Quam, sapiente.
            </CardDescription>
            <CardContent>
              <div id="image" className="grid grid-cols-4 grid-rows-3">
                <img src="1.png" alt="" className="h-20 w-36 rounded-md" />
                <img src="2.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="4.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="5.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="6.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="7.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="8.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="9.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="10.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="11.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="3.png" alt="" className="h-20 w-36 rounded-md"/>
              </div>
            </CardContent>
            <CardFooter className="gap-8">
                <div id="views" className="flex items-center text-gray-500">
                    <EyeIcon className="pr-2"/> <p id="view_number" className="text-[14px]">1563</p>
                </div>
                <div id="like"  className="flex items-center text-gray-500">
                    <Heart className=" pr-2"/><p className="text-[14px]">Like</p>
                </div>
                <div id="comments" className="flex items-center text-gray-500">
                    <MessageSquareTextIcon className=" pr-2"/><p className="text-[14px]">Comments</p>
                </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-x-4">
                <div id="profile_image">
                    <Avatar>
                        <AvatarImage src="my_image.jpg"/>
                        <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                </div>
                <div id="profile_name">
                    Parambrata Ghosh
                    <div id="time" className="text-sm">
                    5 hours ago
                </div>
                </div>
                
            </CardHeader>
            <CardDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos rerum inventore nulla necessitatibus eius. Omnis,
              cumque mollitia quisquam inventore veritatis libero dolorem
              aperiam laborum. Quaerat animi quisquam dignissimos assumenda
              eligendi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit quis laborum animi sunt accusamus, voluptatum tempore! Praesentium doloribus deleniti quisquam. Doloribus impedit velit temporibus. Tempore sit ipsum veniam! Quam, sapiente.
            </CardDescription>
            <CardContent>
              <div id="image" className="grid grid-cols-4 grid-rows-3">
                <img src="1.png" alt="" className="h-20 w-36 rounded-md" />
                <img src="2.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="4.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="5.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="6.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="7.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="8.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="9.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="10.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="11.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="3.png" alt="" className="h-20 w-36 rounded-md"/>
              </div>
            </CardContent>
            <CardFooter className="gap-8">
                <div id="views" className="flex items-center text-gray-500">
                    <EyeIcon className="pr-2"/> <p id="view_number" className="text-[14px]">1563</p>
                </div>
                <div id="like"  className="flex items-center text-gray-500">
                    <Heart className=" pr-2"/><p className="text-[14px]">Like</p>
                </div>
                <div id="comments" className="flex items-center text-gray-500">
                    <MessageSquareTextIcon className=" pr-2"/><p className="text-[14px]">Comments</p>
                </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-x-4">
                <div id="profile_image">
                    <Avatar>
                        <AvatarImage src="my_image.jpg"/>
                        <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                </div>
                <div id="profile_name">
                    Parambrata Ghosh
                    <div id="time" className="text-sm">
                    5 hours ago
                </div>
                </div>
                
            </CardHeader>
            <CardDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Dignissimos rerum inventore nulla necessitatibus eius. Omnis,
              cumque mollitia quisquam inventore veritatis libero dolorem
              aperiam laborum. Quaerat animi quisquam dignissimos assumenda
              eligendi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit quis laborum animi sunt accusamus, voluptatum tempore! Praesentium doloribus deleniti quisquam. Doloribus impedit velit temporibus. Tempore sit ipsum veniam! Quam, sapiente.
            </CardDescription>
            <CardContent>
              <div id="image" className="grid grid-cols-4 grid-rows-3">
                <img src="1.png" alt="" className="h-20 w-36 rounded-md" />
                <img src="2.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="4.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="5.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="6.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="7.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="8.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="9.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="10.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="11.png" alt="" className="h-20 w-36 rounded-md"/>
                <img src="3.png" alt="" className="h-20 w-36 rounded-md"/>
              </div>
            </CardContent>
            <CardFooter className="gap-8">
                <div id="views" className="flex items-center text-gray-500">
                    <EyeIcon className="pr-2"/> <p id="view_number" className="text-[14px]">1563</p>
                </div>
                <div id="like"  className="flex items-center text-gray-500">
                    <Heart className=" pr-2"/><p className="text-[14px]">Like</p>
                </div>
                <div id="comments" className="flex items-center text-gray-500">
                    <MessageSquareTextIcon className=" pr-2"/><p className="text-[14px]">Comments</p>
                </div>
            </CardFooter>
          </Card>
        </div>
        <div id="updates"></div>
        <div id="suggestions"></div>
        <div id="category"></div>
      </div>
    </div>
  );
}
