'use client';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Domain } from "../../../../lib/Domain";
import UseAuth from "../../../../lib/hooks/UseAuth";
import { KeyRound } from "lucide-react";

export default function SignInPage() {
    const [pageloading, setPageloading] = useState(false);
    const { loading, authenticated } = UseAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPageloading(true);

        try {
            const response = await axios.post(`${Domain}/api/v1/users/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            const { user, accessToken, refreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            toast({
                title: `Welcome ${user.full_name}`,
                description: "Logged in successfully"
            });
            router.push("/dashboard");
        } catch (err: any) {
            toast({
                title: "Login error",
                description: err.response?.data?.message || 'Something went wrong'
            });
        } finally {
            setPageloading(false);
        }
    };

    useEffect(() => {
        if (authenticated) {
            router.push("/dashboard");
        }
    }, [authenticated, router]);

    return (
        <div className="min-h-screen bg-black">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/">
                            <div className="text-2xl font-bold text-white cursor-pointer">
                                ProjectXplore
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="w-full min-h-screen flex justify-center items-center pt-16">
                <Toaster />
                <div className="relative w-full max-w-md px-4">
                    {/* Gradient Effect */}
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-400 to-violet-400 transform scale-[0.80] rounded-full blur-3xl opacity-30" />
                    
                    <Card className="relative border-neutral-800 bg-neutral-900/90 backdrop-blur-sm">
                        <CardHeader className="space-y-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-blue-400 mx-auto">
                                <KeyRound className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-2xl text-center text-white">
                                Welcome Back
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-neutral-200">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-neutral-200">Password</Label>
                                    <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    className="bg-neutral-800 border-neutral-700 text-white"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-400 to-violet-400 hover:from-blue-500 hover:to-violet-500 text-white"
                                onClick={handleSubmit}
                                disabled={pageloading || loading}
                            >
                                {pageloading ? 'Signing in...' : 'Sign in'}
                            </Button>
                            <div className="text-center text-neutral-300">
                                Don&apos;t have an account?{" "}
                                <Link href="/auth/signup" className="text-blue-400 hover:text-blue-300">
                                    Sign up
                                </Link>
                            </div>
                            <Meteors number={20} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}