import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface AvatarUploaderProps {
  setSelectedFile: (file: File | null) => void;
}

const AvatarUploader = ({ setSelectedFile }: AvatarUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  // Helper function to compress the image
  const compressImage = (file: File, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new window.Image(); // Explicitly use window.Image
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Define the max width and height (adjust this as necessary)
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (MAX_WIDTH / width) * height;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (MAX_HEIGHT / height) * width;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);

            // Compress and convert to base64
            const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
            resolve(compressedBase64);
          } else {
            reject("Canvas context is not available");
          }
        };

        img.onerror = () => {
          reject("Image loading error");
        };
      };
      reader.onerror = () => {
        reject("File reading error");
      };
    });
  };

  const fileSelectedHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      setSelectedFile(file);

      try {
        // Compress the image before setting the preview URL
        const compressedBase64 = await compressImage(file);
        setPreviewUrl(compressedBase64);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
  };

  const triggerFileInput = () => {
    uploadRef.current?.click();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <input
        type="file"
        ref={uploadRef}
        style={{ display: "none" }}
        onChange={fileSelectedHandler}
      />
      {!previewUrl && (
        <User/>
      )}
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Avatar Preview"
          width={50}
          height={50}
          className="w-[50px] h-[50px] object-cover rounded-full"
          unoptimized={true}
        />
      )}
      <Button
        onClick={triggerFileInput}
        className="bg-blue-600 px-3 py-1 rounded-xl text-white font-semibold flex justify-center items-center"
      >
        Upload Profile Image
      </Button>
    </div>
  );
};
export default AvatarUploader;
