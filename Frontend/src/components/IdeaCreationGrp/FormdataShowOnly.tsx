import { Ideas } from "../../../lib/interface/INTERFACE";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

const FormdataShowOnly = ({ ideaDetails }: { ideaDetails: Ideas }) => {
    return (
        <form className="space-y-4 w-full flex flex-col items-center h-full">
            <div className="w-full ">
                <label htmlFor="ideaName" className="text-xl font-bold">Idea Name</label>
                <div className="border-2 m-3 p-3 rounded-md border-black">{ideaDetails.idea_name}</div>
            </div>

            <div className="w-full">
                <label htmlFor="ideaDescription"  className="text-xl font-bold">Idea Description</label>
                <div className="border-2 m-3 p-3 rounded-md border-black">{ideaDetails.idea_text}</div>
            </div>

            {/* Links */}
            <div className="w-full flex flex-col justify-center gap-4 h-auto px-5">
                <div className="w-full">
                    <Card className="w-full overflow-y-auto max-h-60">
                        <CardHeader className="text-xl font-bold">Links</CardHeader>
                        <CardContent className="flex flex-wrap gap-4">
                            {ideaDetails.usefull_links.map((link, index) => (
                                <div key={index} className="w-full">
                                    <label htmlFor={`mediaLink-${index}`} className="font-semibold">
                                        Media Link {index + 1}
                                    </label>
                                    <div className="truncate text-blue-500 underline">{link}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Images */}
                <div className="w-full">
                    <Card className="w-full">
                        <CardHeader className="text-xl font-bold">Images</CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            {ideaDetails?.image_link?.map((link, index) => (
                                <div key={index} className="flex justify-center">
                                    <Image
                                    width={128}
                                    height={128}
                                        src={link}
                                        alt={`Preview ${index}`}
                                        className="w-32 h-32 object-contain rounded-md border"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Videos */}
                <div className="w-full">
                    <Card className="w-full">
                        <CardHeader className="text-xl font-bold">Videos</CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            {ideaDetails?.video_link?.map((link, index) => (
                                <div key={index} className="flex justify-center">
                                    <video
                                        src={link}
                                        autoPlay
                                        muted
                                        loop
                                        className="w-32 h-32 object-contain rounded-md"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Documents */}
                <div className="w-full">
                    <Card className="w-full">
                        <CardHeader className="text-xl font-bold">Documents</CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            {ideaDetails?.docs_link?.map((link, index) => (
                                <div key={index} className="flex justify-center">
                                    <object
                                        data={link}
                                        type="application/pdf"
                                        width="100%"
                                        height="200"
                                        className="border rounded-md"
                                    >
                                        <p>Preview not available</p>
                                    </object>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
};

export default FormdataShowOnly;
