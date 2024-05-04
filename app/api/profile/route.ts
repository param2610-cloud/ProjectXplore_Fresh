import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/client";


export async function GET(request:NextRequest){
    const response = request.nextUrl.searchParams
    const UserId = response.get("id")
    const supabase = createClient()
    const user = null
    if(UserId){
        const user = await supabase.from("Profile_info").select("*").eq("id",UserId)
    }
    return new Response(JSON.stringify(user))
}