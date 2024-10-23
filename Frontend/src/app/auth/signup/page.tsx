"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { Domain } from "../../../../lib/Domain";
import { useAtom } from "jotai";
import userAtom from '../../../../lib/atoms/UserAtom';
import { ArrowLeft } from "lucide-react";
import Avataruploader from "../../../../lib/control/Avataruploader";
import UploadOnCloudinary from "../../../../lib/control/UploadOnCloudinary";

interface FormData {
    email: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    confirmPassword: string;
}

function Signup() {
    const router = useRouter();
    const { toast } = useToast();
    const [, setUserId] = useAtom(userAtom);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.username || !formData.password || 
            !formData.firstname || !formData.lastname || !formData.confirmPassword) {
            throw new Error("All fields are required");
        }
        if (formData.password !== formData.confirmPassword) {
            throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                `${Domain}/api/v1/users/login`,
                { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const { user, accessToken, refreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUserId(user.user_id);
            
            toast({
                title: "Success",
                description: "Logged in successfully",
            });
            
            router.push("/dashboard");
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };
    
    const [imageLinks, setImageLinks] = useState<string[]>([]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate form
            validateForm();

            // Handle avatar upload if file is selected
            let avatarUrl = "";
            if (selectedFile) {
                await UploadOnCloudinary({
                    mediaFiles: [selectedFile],
                    setuploadedImageMediaLinks: (links:any) => imageLinks.push(...links),
                    setuploadedVideoMediaLinks: () => {},
                });
                avatarUrl = imageLinks[0] || "";
            }

            // Register user
            const response = await axios.post(`${Domain}/api/v1/users/register`, {
                full_name: `${formData.firstname} ${formData.lastname}`,
                email: formData.email,
                password: formData.password,
                username: formData.username,
                avatarUrl,
            });

            toast({
                title: "Success",
                description: "Account created successfully",
            });

            // Automatically login after successful registration
            await handleLogin(formData.email, formData.password);

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || error.message || "An error occurred",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/" className="flex items-center gap-2 text-neutral-200 hover:text-white">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Home</span>
                        </Link>
                        <div className="text-2xl font-bold text-white">
                            ProjectXplore
                        </div>
                    </div>
                </div>
            </nav>

            <div className="w-full min-h-screen pt-24 pb-12 flex justify-center items-center px-4">
                <Toaster />
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-violet-400 transform scale-[0.80] rounded-3xl blur-3xl opacity-30" />
                    
                    <Card className="relative border-neutral-800 bg-neutral-900/70 backdrop-blur-sm">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-white">
                                Create an account
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                {/* Optional Avatar Upload */}
                                <div className="flex justify-center mb-4">
                                    <Avataruploader setSelectedFile={setSelectedFile} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname" className="text-neutral-200">First name</Label>
                                        <Input
                                            id="firstname"
                                            name="firstname"
                                            placeholder="John"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                            className="bg-neutral-800 border-neutral-700 text-neutral-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname" className="text-neutral-200">Last name</Label>
                                        <Input
                                            id="lastname"
                                            name="lastname"
                                            placeholder="Doe"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            className="bg-neutral-800 border-neutral-700 text-neutral-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-neutral-200">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="johndoe"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="bg-neutral-800 border-neutral-700 text-neutral-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-neutral-200">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="bg-neutral-800 border-neutral-700 text-neutral-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-neutral-200">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="bg-neutral-800 border-neutral-700 text-neutral-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-neutral-200">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="bg-neutral-800 border-neutral-700 text-neutral-200"
                                    />
                                </div>

                                <Button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-400 to-violet-400 hover:from-blue-500 hover:to-violet-500 text-white"
                                    disabled={loading}
                                >
                                    {loading ? "Creating account..." : "Create account"}
                                </Button>

                                <p className="text-center text-neutral-400">
                                    Already have an account?{" "}
                                    <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Signup;