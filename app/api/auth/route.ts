import {NextRequest} from 'next/server'
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";


export async function GET(request:NextRequest) {
    const auth = getAuth(app)
    const user = auth.currentUser
    return user
}    
