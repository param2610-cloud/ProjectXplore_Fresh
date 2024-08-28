"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, TrashIcon } from "lucide-react"; // or any icon library you prefer
import axios from "axios";
import Formdata_ from "@/components/IdeaCreationGrp/FormdataCompo";

const IdeaSubmission = () => {
    const [ideaSubmitted,setideaSubmitted] = useState<boolean>(false)
    return (
        <div className="flex items-center flex-col h-full lg:max-h-[calc(100vh-60px)]">
            <div className="text-[40px] font-serif m-10">   
                Idea Submission 
            </div>
            <div className="w-[100%] h-full">
            <Formdata_ setSubmitted={setideaSubmitted}/>
            </div>
        </div>
    );
};

export default IdeaSubmission;
