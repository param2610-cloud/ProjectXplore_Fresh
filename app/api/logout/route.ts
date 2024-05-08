import {NextRequest, NextResponse} from 'next/server'
import { getAuth, signOut } from "firebase/auth";
import {app}  from "@/firebase";


export async function GET(request:NextRequest) {
  const auth = getAuth(app)
  const user = auth.currentUser;
  console.log("api::",user)
  if (user) {
    try {
      await signOut(auth);
      return NextResponse.json({ message: "User signed out successfully" });
    } catch (error) {
        console.error("Error signing out:", error);
        return NextResponse.json({ error: "Error occurred while logging out" });
    }
  } else {
    return NextResponse.json({ message: "User is already signed out" });
  }
}
