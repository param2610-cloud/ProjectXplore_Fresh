import {NextRequest} from 'next/server'
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {app} from "@/firebase"


const auth = getAuth(app);


export async function GET(request:NextRequest) {
    const response = request.nextUrl.searchParams
    const email = response.get("email") || ""
    const password = response.get("password") || ""
    const res = await LoginUser(email, password, );
    return new Response(JSON.stringify(res))
}        






 function LoginUser(email: string, password: string): Promise<{ error: boolean; errorMessage: string; user: any }> {
  return new Promise((resolve) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user; 
          resolve({ error: false, errorMessage: '', user });
        })
        .catch((error) => {
          const errorCode = error.code
          console.log("code",errorCode)
          const errorMessage = error.message;
          resolve({ error: true, errorMessage, user: null });
        });
    } catch (error) {
      console.log("error",error)
    }
  });
}
