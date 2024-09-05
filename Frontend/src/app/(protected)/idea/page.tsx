"use client";
import Ideacard from "@/components/Ideacard";
import userAtom from '@/lib/atoms/UserAtom';
import { Domain } from "@/lib/Domain";
import UseAuth from "@/lib/hooks/UseAuth";
import { Users } from "@/lib/interface/INTERFACE";
import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { loading, authenticated } = UseAuth();
    const [userid] = useAtom(userAtom);
    const [profile, setprofile] = useState<Users | null>();
    useEffect(() => {
        const fetchdata = async () => {
            const response2 = await axios.get(
                `${Domain}/api/v1/users/getUser`,
                {
                    params: {
                        userId: userid,
                    },
                }
            );
            setprofile(response2.data.data);
        };
        if (userid) {
            fetchdata();
        }
    }, [userid]);
    return (
      <div className="p-5 flex flex-col gap-4">
        <div className="text-2xl">
          My Ideas
        </div>
        {
            profile?.ideas && profile.ideas.map((Idea,index)=>(
                <Ideacard Idea={Idea} key={index}/>
            ))
        }
      </div>
    );
};

export default Page;