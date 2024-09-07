import React, { useState } from "react";
import axios from "axios";
import { ProjectData } from "../../interface/INTERFACE";

interface Media {
    image: string[];
    video: string[];
}

interface FeatureSection {
    text: string;
    media: Media;
}

interface Feature {
    input: FeatureSection;
    process: FeatureSection;
    output: FeatureSection;
}

const useFeatureHandler = (ProjectData:ProjectData,setProjectData:React.Dispatch<React.SetStateAction<ProjectData>>) => {

    const [features, setFeatures] = useState<Feature[]>([]);
    const [currentFeature, setCurrentFeature] = useState<Feature>({
        input: { text: "", media: { image: [], video: [] } },
        process: { text: "", media: { image: [], video: [] } },
        output: { text: "", media: { image: [], video: [] } },
    });

    const handleTextChange = (section: keyof Feature, value: string) => {
        setCurrentFeature((prev) => ({
            ...prev,
            [section]: { ...prev[section], text: value },
        }));
    };

    // const handleFileUpload = async (section: keyof Feature, file: File) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         formData.append(
    //             "upload_preset",
    //             process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    //         );

    //         const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    //         const resourceType = file.type.startsWith("video/")
    //             ? "video"
    //             : "image";
    //         const response = await axios.post(
    //             `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    //             formData
    //         );

    //         if (response.status === 200) {
    //             const uploadedUrl = response.data.secure_url;
    //             setCurrentFeature((prev) => ({
    //                 ...prev,
    //                 [section]: {
    //                     ...prev[section],
    //                     media: {
    //                         ...prev[section].media,
    //                         [resourceType]: [
    //                             ...prev[section].media[resourceType],
    //                             uploadedUrl,
    //                         ],
    //                     },
    //                 },
    //             }));
    //         }
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //     }
    // };

    const addFeature = () => {
        const initial = {
            input: { text: "", media: { image: [], video: [] } },
            process: { text: "", media: { image: [], video: [] } },
            output: { text: "", media: { image: [], video: [] } },
        }
        if(currentFeature.input.text!=="" || currentFeature.process.text!=="" || currentFeature.output.text!==""){

            setProjectData((prev)=>{
                return {
                    ...prev,
                    feature_list: [...prev.features,currentFeature], // Spread `features` array into `prev.features`
                }; 
            })
            setFeatures((prev) => {
                console.log(prev);
                console.log(currentFeature);
                
                return[...prev, currentFeature]});
                setCurrentFeature({
                    input: { text: "", media: { image: [], video: [] } },
                    process: { text: "", media: { image: [], video: [] } },
                    output: { text: "", media: { image: [], video: [] } },
                });
            }
            };
    const handleFileUpload = (section: keyof Feature, url: string, type: 'image' | 'video') => {
        setCurrentFeature(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            media: {
              ...prev[section].media,
              [type]: [...prev[section].media[type], url],
            },
          },
        }));
      };
    
      const handleFileRemove = (section: keyof Feature, index: number, type: 'image' | 'video') => {
        setCurrentFeature(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            media: {
              ...prev[section].media,
              [type]: prev[section].media[type].filter((_, i) => i !== index),
            },
          },
        }));
      };

    return {
        features,
        currentFeature,
        handleTextChange,
        handleFileUpload,
        handleFileRemove,
        addFeature,
    };
};

export default useFeatureHandler;
