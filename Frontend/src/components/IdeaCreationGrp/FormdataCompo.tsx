"use client";
import React, { useEffect, useState } from "react";
import crypto from 'crypto';
import { Loader } from "rsuite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge, CheckIcon, TrashIcon, Loader2 } from "lucide-react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import { Domain } from "@/lib/Domain";
import UploadOnCloudinary from "@/lib/control/UploadOnCloudinary";
import { useAtom } from "jotai";
import { userAtom } from '@/lib/atoms/UserAtom';
import UseAuth from "@/lib/hooks/UseAuth";
import { usePathname } from "next/navigation";
import useFirebaseNotifications from "@/lib/control/FirebaseNotification";

const Formdata_ = ({setSubmitted}:{setSubmitted:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [roomId,setroomId] = useState<string>()
    const pathname = usePathname();
    const parts = pathname.split("/");

    useEffect(() => {
        if (parts[2]) {
            setroomId(parts[2]);
        }
    }, [pathname]);
    const [isloading, setisloading] = useState<boolean>(false);
    const [ideaName, setIdeaName] = useState("");
    const [ideaDescription, setIdeaDescription] = useState("");
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [mediaLinks, setMediaLinks] = useState<string[]>([]);
    const [uploadedImageMediaLinks, setuploadedImageMediaLinks] = useState<string[]>([]);
    const [uploadedVideoMediaLinks, setuploadedVideoMediaLinks] = useState<string[]>([]);
    const [previews, setpreviews] = useState<Array<{ type: string; url: string,public_id:string }>>([]);
    const [fileType, setFileType] = useState("image");
    const [singleMediaLink, setSingleMediaLink] = useState<string>("");
    const { toast } = useToast();
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && UPLOAD_PRESET) {
            const file = e.target.files[0];
            const fileType = file.type.split("/")[0];
            const previewUrl = URL.createObjectURL(file);
            const tempId = Date.now().toString();
            
            setIsUploading(prev => ({ ...prev, [tempId]: true }));
            setpreviews(prev => [...prev, { type: fileType, url: previewUrl, public_id: tempId }]);

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", UPLOAD_PRESET);
                
                const resourceType = file.type.startsWith("video/") ? "video" : "image";
                const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

                const response = await axios.post(uploadUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            
                if (response.status === 200) {
                    const result = response.data;
                    const uploadedUrl = result.secure_url;
                    console.log(`Uploaded URL: ${uploadedUrl}`);
                    
                    if (resourceType === "image") {
                        setuploadedImageMediaLinks(prevLinks => [...prevLinks, uploadedUrl]);
                    } else if (resourceType === "video") {
                        setuploadedVideoMediaLinks(prevLinks => [...prevLinks, uploadedUrl]);
                    }
                    setpreviews(prev => prev.map(p => p.public_id === tempId ? { ...p, public_id: result.public_id } : p));
                } else {
                    console.error("Failed to upload file:", response.statusText);
                    setpreviews(prev => prev.filter(p => p.public_id !== tempId));
                }
            } catch (error) {
                console.log(error);
                setpreviews(prev => prev.filter(p => p.public_id !== tempId));
            } finally {
                setIsUploading(prev => ({ ...prev, [tempId]: false }));
            }
        }
    };
    const handleRemoveFile = async (index: number, public_id: string) => {
        // Remove from previews
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setpreviews(updatedPreviews);

        // Remove from uploaded links
        setuploadedImageMediaLinks(prev => prev.filter((_, i) => i !== index));
        setuploadedVideoMediaLinks(prev => prev.filter((_, i) => i !== index));

        // If it's a successfully uploaded file, delete from Cloudinary
        if (public_id && !public_id.startsWith("temp_")) {
            try {
                const timestamp = Math.round((new Date()).getTime() / 1000);
                const signature = await generateSignature(public_id, timestamp);

                const formdata = new FormData();
                formdata.append("public_id", public_id);
                formdata.append("signature", signature);
                formdata.append("api_key", API_KEY || "");
                formdata.append("timestamp", timestamp.toString());

                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
                    method: "POST",
                    body: formdata,
                });

                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error("Error deleting file from Cloudinary:", error);
            }
        }
    };
    const generateSignature =async (public_id: string, timestamp: number) => {
        
        const signature = await axios.get(`${Domain}/api/v1/self/get-signature`,{
            params:{public_id:public_id,
            timestamp:timestamp}
        })
        console.log(signature);
        console.log(signature.data);
        
        return signature.data
    };


    const handleMediaLinkChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        e.preventDefault();
        const updatedLinks = [...mediaLinks];
        updatedLinks[index] = e.target.value;
        setMediaLinks(updatedLinks);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

            setisloading(true);
            
                if (userId && roomId) {
                    if (
                        uploadedImageMediaLinks &&
                        uploadedVideoMediaLinks
                    ) {
                        const ideaData = {
                            ideaName,
                            ideaDescription,
                            mediaLinks,
                            uploadedImageMediaLinks,
                            uploadedVideoMediaLinks,
                            userId,
                            roomId
                        };
                        console.log(ideaData);

                        const response = await axios.post(
                            `${Domain}/api/v1/idea/create`,
                            ideaData
                        );
                        console.log(response);
                        
                        if (response.status === 200) {
                            toast({
                                title: "Success",
                                description:
                                    "Your idea has been submitted successfully!",
                            });
                            setSubmitted(true)
                            setIdeaName("");
                            setIdeaDescription("");
                            setMediaFiles([]);
                            setpreviews([]);
                            setMediaLinks([]);
                        }else{

                            toast({
                                title: "Error",
                                description: "There was an error submitting your idea.",
                                variant: "destructive",
                            });
                        }else{
                            toast({
                                title: "Error",
                                description: "There was an error submitting your idea.",
                                variant: "destructive",
                            });
                        }
                    }
                }
            setisloading(false);
            setSubmitted(true)
            setisloading(false);
    };
    if(!userId && !authenticated){
        return(<div>
            No Access
        </div>)
    }

    return (
        <form className="space-y-4 w-full flex flex-col items-center h-full">
            <div className="w-1/2">
                <label htmlFor="ideaName">Idea Name</label>
                <Input
                    id="ideaName"
                    placeholder="Enter your idea name"
                    value={ideaName}
                    onChange={(e) => setIdeaName(e.target.value)}
                    required
                />
            </div>

            <div className="w-1/2">
                <label htmlFor="ideaDescription">Idea Description</label>
                <Textarea
                    id="ideaDescription"
                    placeholder="Describe your idea"
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    required
                />
            </div>
            
            <div className="w-full flex justify-center gap-4  h-[40%] px-5 overflow-hidden">
            <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
                    <label htmlFor="mediaFile">
                        Media File (Image/Video/Docs/Links) (If any)
                    </label>
                    <Input
                        type="file"
                        accept="image/*, video/*"
                        id="mediaFile"
                        onChange={handleFileChange}
                        required={mediaFiles.length === 0}
                    />
                    <Card className="w-full overflow-y-scroll">
                        <CardHeader>Links</CardHeader>
                        <CardContent className=" flex flex-col gap-4 ">
                            <div className="flex gap-3">
                            <Input
                                    placeholder="Enter media link"
                                    value={singleMediaLink}
                                    onChange={(e) => {
                                        setSingleMediaLink(e.target.value);
                                    }}
                                />
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMediaLinks([
                                            ...mediaLinks,
                                            singleMediaLink,
                                        ]);
                                        setSingleMediaLink("");
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                            {mediaLinks.map((link, index) => (
                                <div key={index}>
                                    <label htmlFor={`mediaLink-${index}`}>
                                        Media Link {index + 1}
                                    </label>
                                    <Input
                                        id={`mediaLink-${index}`}
                                        placeholder="Enter media link"
                                        value={link}
                                        onChange={(e) =>
                                            handleMediaLinkChange(e, index)
                                        }
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full">
                    <Card className="w-full h-full">
                        <CardHeader className="text-xl font-bold">
                            Images (Hover To Preview)
                        </CardHeader>
                        <CardContent>
                            {previews.map((preview, index) => {
                                const parts = preview.url.split("/");
                                const file_name = parts[parts.length - 1];

                                return (
                                    preview.type === "image" && (
                                        <div className="flex gap-3 justify-center items-start" key={index}>
                                            <div>
                                                <Badge></Badge>
                                            </div>
                                            <div className="relative">
                                                <HoverCard>
                                                    <HoverCardTrigger className="cursor-pointer hover:border-b border-white">
                                                        {file_name}
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        <img
                                                            src={preview.url}
                                                            alt={`Preview ${index}`}
                                                            className="w-32 h-32 object-cover"
                                                        />
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className=""
                                                onClick={() => handleRemoveFile(index, preview.public_id)}
                                                disabled={isUploading[preview.public_id]}
                                            >
                                                {isUploading[preview.public_id] ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                )}
                                            </Button>
                                        </div>
                                    )
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full h-full">
                    <Card className="w-full h-full">
                        <CardHeader className="text-xl font-bold">
                            Videos (Hover To Playback)
                        </CardHeader>
                        <CardContent>
                            {previews.map((preview, index) => {
                                const parts = preview.url.split("/");
                                const file_name = parts[parts.length - 1];

                                return (
                                    preview.type === "video" && (
                                        <div className="flex gap-3 justify-center items-start" key={index}>
                                            <div>
                                                <Badge></Badge>
                                            </div>
                                            <div className="relative">
                                                <HoverCard>
                                                    <HoverCardTrigger className="cursor-pointer hover:border-b border-white">
                                                        {file_name}
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        <video controls className="w-32 h-32">
                                                            <source src={preview.url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className=""
                                                onClick={() => handleRemoveFile(index, preview.public_id)}
                                                disabled={isUploading[preview.public_id]}
                                            >
                                                {isUploading[preview.public_id] ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                )}
                                            </Button>
                                        </div>
                                    )
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Button type="submit" onClick={handleSubmit}>
                {isloading ? "Uploading" : "Submit"}
            </Button>
        </form>
    );
};

export default Formdata_;