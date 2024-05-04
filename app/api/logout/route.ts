import {NextRequest, NextResponse} from 'next/server'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";


export async function GET(request:NextRequest) {
    const auth = getAuth(app)
    try {
      await signOut(auth);
      return new NextResponse("Logged out successfully!", { status: 200 });
  } catch (error) {
      console.error("Error signing out:", error);
      return new NextResponse("Error occurred while logging out", { status: 500 });
  }
}    
