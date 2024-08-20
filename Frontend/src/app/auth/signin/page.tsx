"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { domain } from "@/lib/domain"
import { useRouter } from "next/navigation"

export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setloading] = useState<boolean>(false)
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setloading(true);
        
        try {
            const response = await axios.post(`${domain}/api/v1/users/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            }); 
                const  {user} = response.data.data;
                toast({
                    title: `Welcome ${user.name}`,
                    description: "Logged In sucessfully"
                });
            
    
            
            setloading(false)
            router.push("/dashboard")
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
            setloading(false)
        }
    };
    
    useEffect(() => {
        if (error != null) {
            toast({
                title: "Login error",
                description: error
            })
        }
    }, [error])

    return (
        <div className="w-screen min-h-screen flex justify-center  items-center">
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
                                onChange={(e: any) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required value={password} onChange={(e: any) => setPassword(e.target.value)} />
                        </div>
                        
                        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={loading?true:false }>
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
    )
}
