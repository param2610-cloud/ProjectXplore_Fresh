import React, {useState} from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/ui/card";
import { Article } from "./cards";
import Link from "next/link";

interface DevCardProps {
    item : Article
}

const DevCard:React.FC<DevCardProps>= ({item}) => {
  let refinedContent: string | null = null;
  let [Show, SetShow] = useState<boolean>(false);
  if (item.content && item.content.includes('…')) {
    const ellipsisIndex = item.content.indexOf('…');
    refinedContent = item.content.slice(0, ellipsisIndex);
  } else {
    refinedContent = item.content;
  }
  return (
    <div className="min-[1350px]:w-[550px] min-[1920px]:w-[590px] w-[400px] my-10">
      <Card className="">
        <div className="w-full flex justify-center mt-2 mb-3">
          <img
            src={item.urlToImage}
            alt="Image"
            className="min-[1350px]:w-[540px] min-[1920px]:w-[570px] w-[380px] border rounded-md"
          />
        </div>
        <CardTitle className="mx-3 leading-7 mb-2">{item.title}</CardTitle>
        <CardDescription>
          <div className="mx-4 text-sm pb-4">
            {item.description}
            {!Show && <button onClick={() => SetShow(true)} className="text-blue-600"> Show more</button>}
            {Show && <div>{refinedContent}
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600"> More details</a>
            </div>}
          </div>
        </CardDescription>
      </Card>
    </div>
  );
};

export default DevCard;
