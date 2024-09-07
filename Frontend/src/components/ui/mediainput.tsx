import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { X } from "lucide-react";
import Image from "next/image";

const Mediainput = ({onChange}:{onChange:any}) => {
    const [img, setimg] = useState<File[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setimg((previmg) => [...previmg, ...newFiles]);
       
        }
    };
    const handleDelete = (file: File) => {
        setimg((prevImg) => prevImg.filter((f) => f !== file));
   
    };
    useEffect(() => {
        onChange(img);
      }, [img, onChange]);
    return (
        <div className="w-full">
            <Input type="file" multiple onChange={handleChange} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {img.map((file, index) => (
                    <div key={file.name} style={{ margin: "10px" }}>
                        <button
                            onClick={() => handleDelete(file)}
                            className="absolute cursor-pointer backdrop-blur-xl text-gray-600 rounded-full m-1"
                        >
                            <X/>
                        </button>
                        <Image
                        width={100}
                        height={100}
                            src={URL.createObjectURL(file)}
                            alt={`uploaded-${index}`}
                            style={{
                                objectFit: "cover",
                            }}
                            className="rounded-md m-2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mediainput;