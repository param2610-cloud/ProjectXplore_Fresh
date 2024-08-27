"use client";
import React, { useState } from "react";
import { Loader } from 'rsuite';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge, CheckIcon, TrashIcon } from "lucide-react";
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
import { userAtom } from "@/lib/atoms/UserAtom";
import UseAuth from "@/lib/hooks/UseUser";

const Formdata_ = () => {
    const { loading, authenticated } = UseAuth();
    const [userId] = useAtom(userAtom);
    const [isloading,setisloading] = useState<boolean>(false)
    const [ideaName, setIdeaName] = useState("");
    const [ideaDescription, setIdeaDescription] = useState("");
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [mediaLinks, setMediaLinks] = useState<string[]>([]);
    const [uploadedImageMediaLinks, setuploadedImageMediaLinks] = useState<
        string[]
    >([]);
    const [uploadedVideoMediaLinks, setuploadedVideoMediaLinks] = useState<
        string[]
    >([]);
    const [uploadedApplicationMediaLinks, setuploadedApplicationMediaLinks] =
        useState<string[]>([]);
    const [previews, setpreviews] = useState<
        Array<{ type: string; url: string }>
    >([]);
    const [fileType, setFileType] = useState("image");
    const [singleMediaLink, setSingleMediaLink] = useState<string>("");
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setMediaFiles([...mediaFiles, file]);

            const fileType = file.type.split("/")[0];
            const previewUrl = URL.createObjectURL(file);

            setpreviews([...previews, { type: fileType, url: previewUrl }]);
        }
    };

    const handleMediaLinkChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        e.preventDefault()
        const updatedLinks = [...mediaLinks];
        updatedLinks[index] = e.target.value;
        setMediaLinks(updatedLinks);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setisloading(true)
            const uploadMediaFile = await UploadOnCloudinary({
                mediaFiles,
                uploadedImageMediaLinks,
                setuploadedImageMediaLinks,
                uploadedVideoMediaLinks,
                setuploadedVideoMediaLinks,
                uploadedApplicationMediaLinks,
                setuploadedApplicationMediaLinks,
            });

            if (userId) {
                const ideaData = {
                    ideaName,
                    ideaDescription,
                    mediaLinks,
                    uploadedImageMediaLinks,
                    uploadedVideoMediaLinks,
                    uploadedApplicationMediaLinks,
                    userId,
                };
                console.log(ideaData);
                
                const response = await axios.post(
                    `${Domain}/api/v1/idea/create`,
                    ideaData
                );
                if (response.status === 200) {
                    toast({
                        title: "Success",
                        description:
                            "Your idea has been submitted successfully!",
                    });
                    setIdeaName("");
                    setIdeaDescription("");
                    setMediaFiles([]);
                    setpreviews([]);
                    setMediaLinks([]);
                }
            }
            setisloading(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error submitting your idea.",
                variant: "destructive",
            });
            setisloading(false)
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = mediaFiles.filter((_, i) => i !== index);
        setMediaFiles(updatedFiles);

        const updatedpreviews = previews.filter((_, i) => i !== index);
        setpreviews(updatedpreviews);
    };

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
                        accept="image/*, video/*, .pdf"
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
                                        e.preventDefault()
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
                                        <div className="flex gap-3 justify-center items-start">
                                            <div>
                                                <Badge></Badge>
                                            </div>
                                            <div
                                                key={index}
                                                className="relative"
                                            >
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
                                                onClick={() =>
                                                    handleRemoveFile(index)
                                                }
                                            >
                                                <TrashIcon className="h-5 w-5 text-red-500" />
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
                            {previews.length > 0 &&
                                previews.map((preview, index) => {
                                    const parts = preview.url.split("/");
                                    const file_name = parts[parts.length - 1];
                                    console.log(preview.type);

                                    return (
                                        preview.type === "video" && (
                                            <div className="flex gap-3 justify-center items-start">
                                                <div>
                                                    <Badge></Badge>
                                                </div>
                                                <div
                                                    key={index}
                                                    className="relative"
                                                >
                                                    <HoverCard>
                                                        <HoverCardTrigger className="cursor-pointer hover:border-b border-white">
                                                            {file_name}
                                                        </HoverCardTrigger>
                                                        <HoverCardContent>
                                                            {preview.type ===
                                                                "video" && (
                                                                <video
                                                                    controls
                                                                    className="w-32 h-32"
                                                                >
                                                                    <source
                                                                        src={
                                                                            preview.url
                                                                        }
                                                                        type="video/mp4"
                                                                    />
                                                                    Your browser
                                                                    does not
                                                                    support the
                                                                    video tag.
                                                                </video>
                                                            )}
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    className=""
                                                    onClick={() =>
                                                        handleRemoveFile(index)
                                                    }
                                                >
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
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
                            Documents (Hover To Preview)
                        </CardHeader>
                        <CardContent>
                            {previews.map((preview, index) => {
                                const parts = preview.url.split("/");
                                const file_name = parts[parts.length - 1];

                                return (
                                    preview.type === "application" && (
                                        <div className="flex gap-3 justify-center items-start">
                                            <div>
                                                <Badge></Badge>
                                            </div>
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                <HoverCard>
                                                    <HoverCardTrigger className="cursor-pointer hover:border-b border-white">
                                                        {file_name}
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        <object
                                                            data={preview.url}
                                                            type="application/pdf"
                                                            width="100"
                                                            height="100"
                                                        >
                                                            <p>
                                                                Preview not
                                                                available
                                                            </p>
                                                        </object>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className=""
                                                onClick={() =>
                                                    handleRemoveFile(index)
                                                }
                                            >
                                                <TrashIcon className="h-5 w-5 text-red-500" />
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
                {isloading?'Uploading':'Submit'}
            </Button>
        </form>
    );
};

export default Formdata_;
