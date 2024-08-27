'use client'
import axios from "axios";
import { useState } from "react";
import { Domain } from "../Domain";

interface UploadOnCloudinaryProps {
    mediaFiles: File[]; // Array of media files to be uploaded
    setuploadedImageMediaLinks: React.Dispatch<React.SetStateAction<string[]>>;
    setuploadedVideoMediaLinks: React.Dispatch<React.SetStateAction<string[]>>;
    setuploadedApplicationMediaLinks: React.Dispatch<React.SetStateAction<string[]>>;
    uploadedImageMediaLinks:string[],
    uploadedVideoMediaLinks:string[],
    uploadedApplicationMediaLinks:string[],

}

const UploadOnCloudinary = async ({
    mediaFiles,
    uploadedImageMediaLinks,
    setuploadedImageMediaLinks,
    uploadedVideoMediaLinks,
    setuploadedVideoMediaLinks,
    uploadedApplicationMediaLinks,
    setuploadedApplicationMediaLinks,
}: UploadOnCloudinaryProps) => {

    for (const file of mediaFiles) {
        const newform = new FormData();
        newform.append("mediaFile", file);

        try {
            const response = await axios.post(
                `${Domain}/api/v1/self/upload-on-cloudinary`,
                newform
            );
            if (response) {
                const uploadedUrl = response.data.data; 
                
                
                if (file.type.startsWith("image/")) {
                    console.log(uploadedUrl);
                    setuploadedImageMediaLinks([
                        ...uploadedImageMediaLinks,
                        uploadedUrl,
                    ]);
                } else if (file.type.startsWith("video/")) {
                    console.log(uploadedUrl);
                    setuploadedVideoMediaLinks([
                        ...uploadedVideoMediaLinks,
                        uploadedUrl,
                    ]);
                } else if (file.type.startsWith("application/")) {
                    console.log(uploadedUrl);
                    setuploadedApplicationMediaLinks([
                        ...uploadedApplicationMediaLinks,
                        uploadedUrl,
                    ]);
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
};

export default UploadOnCloudinary;
