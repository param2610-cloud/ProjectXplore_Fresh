import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
    Badge,
    Loader2,
    Upload,
    LinkIcon,
    ImageIcon,
    Video,
    Trash2,
} from "lucide-react";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import { motion, AnimatePresence } from "framer-motion";
import UploadOnCloudinary from "../../../lib/control/UploadOnCloudinary";
import { Domain } from "../../../lib/Domain";

const getMediaStateUpdater = (
    type: "image" | "video",
    setPreviews: React.Dispatch<React.SetStateAction<FilePreview[]>>,
    tempId: string
): React.Dispatch<React.SetStateAction<string[]>> => {
    return (newValue) => {
        if (typeof newValue === "function") {
            setPreviews((prev) => {
                const currentUrls = prev
                    .filter((p) => p.type === type)
                    .map((p) => p.url);
                const newUrls = newValue(currentUrls);
                return prev.map((p) =>
                    p.public_id === tempId
                        ? { ...p, url: newUrls[newUrls.length - 1] }
                        : p
                );
            });
        } else {
            setPreviews((prev) =>
                prev.map((p) =>
                    p.public_id === tempId
                        ? { ...p, url: newValue[newValue.length - 1] }
                        : p
                )
            );
        }
        return []; // Return empty array to satisfy type
    };
};

// Types
interface FormDataProps {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    userId?: string;
    roomId?: string;
}

interface FilePreview {
    type: string;
    url: string;
    public_id: string;
    file?: File;
}

// Validation schema
const formSchema = z.object({
    ideaName: z
        .string()
        .min(3, "Idea name must be at least 3 characters")
        .max(100, "Idea name must not exceed 100 characters"),
    ideaDescription: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must not exceed 1000 characters"),
    mediaLinks: z.array(z.string().url("Invalid URL")).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
];
const MAX_FILES = 5;

const FormData: React.FC<FormDataProps> = ({
    setSubmitted,
    userId,
    roomId,
}) => {
    // Form validation setup
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ideaName: "",
            ideaDescription: "",
            mediaLinks: [],
        },
    });

    // State management
    const [previews, setPreviews] = useState<FilePreview[]>([]);
    const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>(
        {}
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    // File validation
    const validateFile = (file: File): string | null => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return "Invalid file type. Only images and videos are allowed.";
        }
        if (file.size > MAX_FILE_SIZE) {
            return "File size exceeds 10MB limit.";
        }
        if (previews.length >= MAX_FILES) {
            return "Maximum number of files reached.";
        }
        return null;
    };

    const handleRemoveFile = (publicId: string) => {
        setPreviews((prev) => prev.filter((p) => p.public_id !== publicId));
        if (publicId.startsWith("blob:")) {
            URL.revokeObjectURL(publicId);
        }
    };

    // File upload handling
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files;
            if (!files?.length) return;

            const file = files[0];
            const validationError = validateFile(file);

            if (validationError) {
                toast({
                    title: "Error",
                    description: validationError,
                    variant: "destructive",
                });
                return;
            }

            const tempId = `temp_${Date.now()}`;
            const fileType = file.type.split("/")[0] as "image" | "video";
            const previewUrl = URL.createObjectURL(file);

            setIsUploading((prev) => ({ ...prev, [tempId]: true }));

            setPreviews((prev) => [
                ...prev,
                {
                    type: fileType,
                    url: previewUrl,
                    public_id: tempId,
                    file,
                },
            ]);

            try {
                const uploadResult = await UploadOnCloudinary({
                    mediaFiles: [file],
                    setuploadedImageMediaLinks: getMediaStateUpdater(
                        "image",
                        setPreviews,
                        tempId
                    ),
                    setuploadedVideoMediaLinks: getMediaStateUpdater(
                        "video",
                        setPreviews,
                        tempId
                    ),
                });

                // Handle the upload result if needed
            } catch (error) {
                handleUploadError(error, tempId);
            } finally {
                setIsUploading((prev) => ({ ...prev, [tempId]: false }));
            }
        } catch (error) {
            console.error("File handling error:", error);
            toast({
                title: "Error",
                description: "Failed to process file",
                variant: "destructive",
            });
        }
    };

    // Form submission
    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);

            if (!userId || !roomId) {
                throw new Error("Missing user or room information");
            }

            const mediaFiles = previews.map((p) => p.url);

            const response = await axios.post(`${Domain}/api/v1/idea/create`, {
                ...data,
                mediaFiles,
                userId,
                roomId,
            });

            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Your idea has been submitted successfully!",
                });
                reset();
                setPreviews([]);
                setSubmitted(true);
            }
        } catch (error) {
            handleSubmissionError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Error handlers
    const handleUploadError = (error: any, tempId: string) => {
        console.error("Upload error:", error);
        setPreviews((prev) => prev.filter((p) => p.public_id !== tempId));
        toast({
            title: "Upload Failed",
            description: "Failed to upload file. Please try again.",
            variant: "destructive",
        });
    };

    const handleSubmissionError = (error: unknown) => {
        console.error("Submission error:", error);
        let errorMessage = "Failed to submit idea. Please try again.";

        if (error instanceof AxiosError) {
            errorMessage = error.response?.data?.message || errorMessage;
        }


                            toast({
                                title: "Error",
                                description: "There was an error submitting your idea.",
                                variant: "destructive",
                            });
                        }else{
        toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
        });
    };

    // Cleanup
    useEffect(() => {
        return () => {
            // Cleanup preview URLs
            previews.forEach((preview) => {
                if (preview.url.startsWith("blob:")) {
                    URL.revokeObjectURL(preview.url);
                }
            });
        };
    }, [previews]);

    if (!userId) {
        return (
            <div className="text-center p-4">Please sign in to continue</div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-7xl mx-auto space-y-8 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Form fields */}
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                    <Controller
                        name="ideaName"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label className="text-neutral-200 font-medium block">
                                    Idea Name
                                </label>
                                <Input
                                    {...field}
                                    className="bg-zinc-900/50 border-white/10"
                                    onError={() => errors.ideaName?.message}
                                />
                                {errors.ideaName && (
                                    <span className="text-red-400 text-sm">
                                        {errors.ideaName.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <Controller
                        name="ideaDescription"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label className="text-neutral-200 font-medium block">
                                    Description
                                </label>
                                <Textarea
                                    {...field}
                                    className="bg-zinc-900/50 border-white/10"
                                    onError={() =>
                                        errors.ideaDescription?.message
                                    }
                                />
                                {errors.ideaDescription && (
                                    <span className="text-red-400 text-sm">
                                        {errors.ideaDescription.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>

            {/* File upload and preview section */}
            <Card className="bg-zinc-900/50 border-white/10">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Media Files</h3>
                    <p className="text-sm text-neutral-400">
                        Upload up to {MAX_FILES} files (max 10MB each)
                    </p>
                </CardHeader>
                <CardContent>
                    <Input
                        type="file"
                        accept={ALLOWED_FILE_TYPES.join(",")}
                        onChange={handleFileChange}
                        disabled={previews.length >= MAX_FILES}
                        className="mb-4"
                    />

                    <AnimatePresence>
                        {previews.map((preview) => (
                            <motion.div
                                key={preview.public_id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-2 mb-2"
                            >
                                <Badge>
                                    {preview.type === "image" ? (
                                        <ImageIcon className="w-4 h-4" />
                                    ) : (
                                        <Video className="w-4 h-4" />
                                    )}
                                </Badge>

                                <HoverCard>
                                    <HoverCardTrigger>
                                        <span className="truncate max-w-xs">
                                            {preview.url.split("/").pop()}
                                        </span>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        {preview.type === "image" ? (
                                            <img
                                                src={preview.url}
                                                alt="Preview"
                                                className="max-w-[200px] rounded"
                                            />
                                        ) : (
                                            <video
                                                src={preview.url}
                                                controls
                                                className="max-w-[200px] rounded"
                                            />
                                        )}
                                    </HoverCardContent>
                                </HoverCard>

                                {isUploading[preview.public_id] ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            handleRemoveFile(preview.public_id)
                                        }
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </CardContent>
            </Card>

            {/* Submit button */}
            <div className="flex justify-center">
                <Button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        Object.keys(isUploading).some((key) => isUploading[key])
                    }
                    className="min-w-[200px]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Idea"
                    )}
                </Button>
            </div>
        </motion.form>
    );
};

export default FormData;
