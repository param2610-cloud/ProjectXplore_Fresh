// import React, { useState, useRef, useCallback } from 'react';
// import axios from 'axios';
// import { Paperclip, X, Loader2 } from 'lucide-react';
// import { Textarea } from '@/components/ui/textarea';
// import { Domain } from '@/lib/Domain';
// import useFeatureHandler from '@/lib/control/project/HandleFeatureChange';
// // import { handleFeatureChange, removeImageFromMediaByIndex } from '@/lib/control/project/HandleFeatureChange';

// interface CloudinaryFileUploadProps {
//     section:"input"|"output"|"process";
// }

// const CloudinaryFileUpload: React.FC<CloudinaryFileUploadProps> = ({
//     section
// }) => {
//     const { features, currentFeature, handleTextChange, handleFileUpload, addFeature } = useFeatureHandler();
//   const [files, setFiles] = useState<File[]>([]);
//   const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});
//   const [previews, setPreviews] = useState<{ url: string; public_id: string; type: string }[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//   const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
//   const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

//   const uploadFile = useCallback(async (file: File, tempId: string) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", UPLOAD_PRESET!);

//       const resourceType = file.type.startsWith("video/") ? "video" : "image";
//       const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

//       const response = await axios.post(uploadUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         const result = response.data;
//         const uploadedUrl = result.secure_url;

//         if (resourceType === "image") {
//           handleFeatureChange(section,'media','image',uploadedUrl)
//         } else if (resourceType === "video") {
//             handleFeatureChange(section,'media','video',uploadedUrl)
//         }

//         setPreviews((prev) =>
//           prev.map((p) => (p.public_id === tempId ? { ...p, public_id: result.public_id } : p))
//         );
//       } else {
//         console.error("Failed to upload file:", response.statusText);
//         setPreviews((prev) => prev.filter((p) => p.public_id !== tempId));
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setPreviews((prev) => prev.filter((p) => p.public_id !== tempId));
//     } finally {
//       setIsUploading((prev) => ({ ...prev, [tempId]: false }));
//     }
//   }, [CLOUD_NAME, UPLOAD_PRESET, handleFeatureChange]);

//   const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files);
//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);

//       newFiles.forEach((file) => {
//         const tempId = Date.now().toString() + Math.random().toString(36).substring(7);
//         const previewUrl = URL.createObjectURL(file);
//         setPreviews((prev) => [...prev, { url: previewUrl, public_id: tempId, type: file.type }]);
//         setIsUploading((prev) => ({ ...prev, [tempId]: true }));

//         // Start uploading immediately
//         uploadFile(file, tempId);
//       });
//     }
//   }, [uploadFile]);

//   const generateSignature = useCallback(async (public_id: string, timestamp: number) => {
//     try {
//       const response = await axios.get(`${Domain}/api/v1/self/get-signature`, {
//         params: { public_id, timestamp }
//       });
//       console.log('Signature response:', response);
//       return response.data;
//     } catch (error) {
//       console.error('Error generating signature:', error);
//       throw error;
//     }
//   }, []);

//   const handleRemoveFile = useCallback(async (index: number, public_id: string) => {
//     setPreviews((prev) => prev.filter((_, i) => i !== index));
//     setFiles((prev) => prev.filter((_, i) => i !== index));

//     if (public_id && !public_id.startsWith("temp_")) {
//       try {
//         const timestamp = Math.round((new Date()).getTime() / 1000);
//         const signature = await generateSignature(public_id, timestamp);

//         const formData = new FormData();
//         formData.append("public_id", public_id);
//         formData.append("signature", signature);
//         formData.append("api_key", API_KEY || "");
//         formData.append("timestamp", timestamp.toString());

//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
//           formData
//         );

//         console.log('File deletion response:', response.data);

//         // Remove from uploaded links
//         removeImageFromMediaByIndex(section, 'media', 'image', index);
//         removeImageFromMediaByIndex(section, 'media', 'video', index);
//       } catch (error) {
//         console.error("Error deleting file from Cloudinary:", error);
//       }
//     }
//   }, [CLOUD_NAME, API_KEY, generateSignature]);

//   return (
//     <div className="w-full rounded-md border border-gray-300 p-2">
//       <div className="flex items-center mb-2">
//         <button
//           onClick={() => fileInputRef.current?.click()}
//           className="p-2 hover:bg-gray-100 rounded-full"
//         >
//           <Paperclip className="w-5 h-5 text-gray-500" />
//         </button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileInputChange}
//           className="hidden"
//           multiple
//         />
//       </div>

//       {previews.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-2">
//           {previews.map((preview, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-background rounded-full px-3 py-1"
//             >
//               <span className="text-sm mr-2">{files[index]?.name}</span>
//               {isUploading[preview.public_id] ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <button
//                   onClick={() => handleRemoveFile(index, preview.public_id)}
//                   className="text-gray-500 hover:text-red-500"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CloudinaryFileUpload;

// import React from 'react';

// interface FileInputComponentProps {
//   section: 'input' | 'process' | 'output';
//   handleFileUpload: (section: 'input' | 'process' | 'output', file: File) => void;
// }

// const FileInputComponent: React.FC<FileInputComponentProps> = ({ section, handleFileUpload }) => {
//   return (
//     <input
//       type="file"
//       onChange={(e) => e.target.files && handleFileUpload(section, e.target.files[0])}
//     />
//   );
// };

// export default FileInputComponent;

import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { Paperclip, X, Loader2 } from "lucide-react";
import { Domain } from "../../lib/Domain";

interface CloudinaryFileUploadProps {
    section: "input" | "output" | "process";
    onFileUpload: (
        section: "input" | "output" | "process",
        url: string,
        type: "image" | "video"
    ) => void;
    onFileRemove: (
        section: "input" | "output" | "process",
        index: number,
        type: "image" | "video"
    ) => void;
}

const CloudinaryFileUpload: React.FC<CloudinaryFileUploadProps> = ({
    section,
    onFileUpload,
    onFileRemove,
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>(
        {}
    );
    const [previews, setPreviews] = useState<
        { url: string; public_id: string; type: string }[]
    >([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

    const uploadFile = useCallback(
        async (file: File, tempId: string) => {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", UPLOAD_PRESET!);

                const resourceType = file.type.startsWith("video/")
                    ? "video"
                    : "image";
                const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

                const response = await axios.post(uploadUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (response.status === 200) {
                    const result = response.data;
                    const uploadedUrl = result.secure_url;

                    onFileUpload(
                        section,
                        uploadedUrl,
                        resourceType as "image" | "video"
                    );

                    setPreviews((prev) =>
                        prev.map((p) =>
                            p.public_id === tempId
                                ? { ...p, public_id: result.public_id }
                                : p
                        )
                    );
                } else {
                    console.error(
                        "Failed to upload file:",
                        response.statusText
                    );
                    setPreviews((prev) =>
                        prev.filter((p) => p.public_id !== tempId)
                    );
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                setPreviews((prev) =>
                    prev.filter((p) => p.public_id !== tempId)
                );
            } finally {
                setIsUploading((prev) => ({ ...prev, [tempId]: false }));
            }
        },
        [CLOUD_NAME, UPLOAD_PRESET, onFileUpload, section]
    );

    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);

                newFiles.forEach((file) => {
                    const tempId =
                        Date.now().toString() +
                        Math.random().toString(36).substring(7);
                    const previewUrl = URL.createObjectURL(file);
                    setPreviews((prev) => [
                        ...prev,
                        { url: previewUrl, public_id: tempId, type: file.type },
                    ]);
                    setIsUploading((prev) => ({ ...prev, [tempId]: true }));

                    uploadFile(file, tempId);
                });
            }
        },
        [uploadFile]
    );

    const handleRemoveFile = useCallback(
        async (index: number, public_id: string) => {
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            setFiles((prev) => prev.filter((_, i) => i !== index));

            if (public_id && !public_id.startsWith("temp_")) {
                try {
                    const timestamp = Math.round(new Date().getTime() / 1000);
                    const signature = await generateSignature(
                        public_id,
                        timestamp
                    );

                    const formData = new FormData();
                    formData.append("public_id", public_id);
                    formData.append("signature", signature);
                    formData.append("api_key", API_KEY || "");
                    formData.append("timestamp", timestamp.toString());

                    await axios.post(
                        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
                        formData
                    );

                    onFileRemove(
                        section,
                        index,
                        previews[index].type.startsWith("video/")
                            ? "video"
                            : "image"
                    );
                } catch (error) {
                    console.error(
                        "Error deleting file from Cloudinary:",
                        error
                    );
                }
            }
        },
        [CLOUD_NAME, API_KEY, onFileRemove, section, previews]
    );

    const generateSignature = useCallback(
        async (public_id: string, timestamp: number) => {
            try {
                const response = await axios.get(
                    `${Domain}/api/v1/self/get-signature`,
                    {
                        params: { public_id, timestamp },
                    }
                );
                return response.data;
            } catch (error) {
                console.error("Error generating signature:", error);
                throw error;
            }
        },
        []
    );

    return (
        <div className="w-full rounded-md border border-gray-300 p-2">
            <div className="flex items-center mb-2">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    className="hidden"
                    multiple
                />
            </div>

            {previews.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {previews.map((preview, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-background rounded-full px-3 py-1"
                        >
                            <span className="text-sm mr-2">
                                {files[index]?.name}
                            </span>
                            {isUploading[preview.public_id] ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <button
                                    onClick={() =>
                                        handleRemoveFile(
                                            index,
                                            preview.public_id
                                        )
                                    }
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CloudinaryFileUpload;
