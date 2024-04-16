"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { LoadingScreen } from "../ui/ui/loader";
import DevCard from "./card";
import { ArrowBigDown } from "lucide-react";


interface newsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const Cards = () => {
  let [Data, setData] = useState<newsResponse>();
  let [isLoading, SetLoading] = useState<boolean>(true);
  let [MoreData, Setmoredata] = useState<number>(0)

  useEffect(() => {
    fetch("/api/Tech_news/?country=in&category=technology", {
      method: "GET",
    })
      .then((e) => e.json())
      .then((e: any) => {
        setData(e);
        SetLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("/api/Tech_news/?country=in&category=technology", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData: any) => {
        setData((prevData)=>{
            if (!prevData) return responseData;
            const mergedArticles = [...prevData.articles, ...responseData.articles];
          return { ...responseData, articles: mergedArticles };
        });
      });
  }, [MoreData]);
  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        Data && (
          <div>
            {Data.articles.map((item: Article, index: number) => {
              
              return (
                <div key={index}>
                  <DevCard item={item}/>
                </div>
              );
            })}
            <div className="w-full flex justify-center"><button onClick={()=>Setmoredata((i)=>i+1)} className="flex">Show More<ArrowBigDown size={25}/></button></div>
          </div>
        )
      )}
    </div>
  );
};

export default Cards;
