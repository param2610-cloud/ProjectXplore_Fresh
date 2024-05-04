import {NextRequest, NextResponse} from 'next/server'
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";


export async function GET(request:NextRequest) {
    const auth = getAuth(app)
    try {
      await signOut(auth);
      return NextResponse.json({ message: "Logged out successfully!" });
  } catch (error) {
      console.error("Error signing out:", error);
      return NextResponse.json({ error: "Error occurred while logging out" });
  }
}    
