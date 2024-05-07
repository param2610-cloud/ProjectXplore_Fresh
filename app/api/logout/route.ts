import {NextRequest, NextResponse} from 'next/server'
import { getAuth, signOut } from "firebase/auth";
import {app}  from "@/firebase";


export async function GET(request:NextRequest) {
  const auth = getAuth(app)
  const user = auth.currentUser;

  if (user) {
    try {
      const data = await signOut(auth);
      return NextResponse.json({ message: data });
    } catch (error) {
        console.error("Error signing out:", error);
        return NextResponse.json({ error: "Error occurred while logging out" });
    }
  } else {
    return NextResponse.json({ message: "User is already signed out" });
  }
}
