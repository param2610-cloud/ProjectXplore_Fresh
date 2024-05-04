
import { getAuth,createUserWithEmailAndPassword, User } from "firebase/auth";
import {app} from "@/firebase"
import { createClient } from "@/lib/supabase/client";
const auth = getAuth(app);
import {NextRequest} from 'next/server'


export async function GET(request:NextRequest) {
    const response = request.nextUrl.searchParams
    const Name = response.get("name") || ""
    const email = response.get("email") || ""
    const password = response.get("password") || ""
    const res = await Signup(email, password, Name);
    return new Response(JSON.stringify(res))
}    



function Signup(email: string, password: string, Name:string): Promise<{ error: boolean; errorMessage: string; user: any }> {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user; 
          CreateUserAtSupabase(user,email,Name);
          resolve({ error: false, errorMessage: '', user });
        })
        .catch((error) => {
          const errorMessage = error.message;
          resolve({ error: true, errorMessage, user: null });
        });
    });
  }





  async function CreateUserAtSupabase(user:User,email:string,Name:string){
    try {
      const user_id = user.uid as string
      const supabase= createClient()
  const  {data,error}=await supabase.from("Profile_info").insert({id:user_id,email:email,Full_Name:Name})
      if(data) console.log(data)
      if(error) {console.log(error)} else { if(typeof window !== undefined){ localStorage.setItem("UserID",user_id)}} 
    } catch (error) {
      console.log(error)
    }
  }