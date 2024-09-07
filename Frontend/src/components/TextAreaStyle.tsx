import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Paperclip, X, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Domain } from '../../lib/Domain';

interface CloudinaryFileUploadProps {
  textareaValue: string;
  onTextareaChange: (value: string) => void;
  setImageMediaLinks: React.Dispatch<React.SetStateAction<string[]>>;
  setVideoMediaLinks: React.Dispatch<React.SetStateAction<string[]>>;
}

const CloudinaryFileUpload: React.FC<CloudinaryFileUploadProps> = ({
  textareaValue,
  onTextareaChange,
  setImageMediaLinks,
  setVideoMediaLinks,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});
  const [previews, setPreviews] = useState<{ url: string; public_id: string; type: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  const handleFileInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      for (const file of newFiles) {
        const tempId = Date.now().toString();
        const previewUrl = URL.createObjectURL(file);
        setPreviews((prev) => [...prev, { url: previewUrl, public_id: tempId, type: file.type }]);
        setIsUploading((prev) => ({ ...prev, [tempId]: true }));

        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", UPLOAD_PRESET!);

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

            if (resourceType === "image") {
              setImageMediaLinks((prevLinks) => [...prevLinks, uploadedUrl]);
            } else if (resourceType === "video") {
              setVideoMediaLinks((prevLinks) => [...prevLinks, uploadedUrl]);
            }

            setPreviews((prev) =>
              prev.map((p) => (p.public_id === tempId ? { ...p, public_id: result.public_id } : p))
            );
          } else {
            console.error("Failed to upload file:", response.statusText);
            setPreviews((prev) => prev.filter((p) => p.public_id !== tempId));
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          setPreviews((prev) => prev.filter((p) => p.public_id !== tempId));
        } finally {
          setIsUploading((prev) => ({ ...prev, [tempId]: false }));
        }
      }
    }
  }, [CLOUD_NAME, UPLOAD_PRESET, setImageMediaLinks, setVideoMediaLinks]);

  const generateSignature = useCallback(async (public_id: string, timestamp: number) => {
    try {
      const response = await axios.get(`${Domain}/api/v1/self/get-signature`, {
        params: { public_id, timestamp }
      });
      console.log('Signature response:', response);
      return response.data;
    } catch (error) {
      console.error('Error generating signature:', error);
      throw error;
    }
  }, []);

  const handleRemoveFile = useCallback(async (index: number, public_id: string) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));

    if (public_id && !public_id.startsWith("temp_")) {
      try {
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const signature = await generateSignature(public_id, timestamp);

        const formData = new FormData();
        formData.append("public_id", public_id);
        formData.append("signature", signature);
        formData.append("api_key", API_KEY || "");
        formData.append("timestamp", timestamp.toString());

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
          formData
        );

        console.log('File deletion response:', response.data);

        // Remove from uploaded links
        setImageMediaLinks((prev) => prev.filter((_, i) => i !== index));
        setVideoMediaLinks((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
      }
    }
  }, [CLOUD_NAME, API_KEY, generateSignature, setImageMediaLinks, setVideoMediaLinks]);

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
      <div className=''>
        
      </div>

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <span className="text-sm mr-2">{files[index]?.name}</span>
              {isUploading[preview.public_id] ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <button
                  onClick={() => handleRemoveFile(index, preview.public_id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Textarea
        value={textareaValue}
        onChange={(e) => onTextareaChange(e.target.value)}
        className="w-full resize-none pr-[70px]"
        placeholder="Give Update"
        rows={3}
      />
    </div>
  );
};

export default CloudinaryFileUpload;