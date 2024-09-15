"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Domain } from "../../../../lib/Domain";
import { useRouter } from "next/navigation";
import UseAuth from "../../../../lib/hooks/UseAuth";

export default function Page() {
    const [pageloading, setPageloading] = useState<boolean>(false);
    const { loading, authenticated } = UseAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
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
            const { user,accessToken,refreshToken } = response.data.data;
            console.log(response);
            localStorage.setItem('accessToken',accessToken)
            localStorage.setItem('refreshToken',refreshToken)
            toast({
                title: `Welcome ${user.full_name}`,
                description: "Logged In successfully"
            });
            setPageloading(false);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
            setPageloading(false);
        }
    };

    useEffect(() => {
        if (error) {
            toast({
                title: "Login error",
                description: error
            });
        }
    }, [error, toast]);

    useEffect(() => {
        if (authenticated) {
            router.push("/dashboard");
        }
    }, [authenticated, router]);

    useEffect(() => {
        if (loading) {
            toast({
                title: "Please wait",
                description: "Validating your previous login"
            });
        } else {
            toast({
                title: "Please Continue",
                description: "Validation process is done."
            });
        }
    }, [loading, toast]);

    return (
        <div className="w-screen min-h-screen flex justify-center items-center">
            <Toaster />
            <Card className="mx-auto max-w-sm scale-125">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={pageloading || loading}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
