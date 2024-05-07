import { NextRequest,NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";


export async function GET(request:NextRequest){
    const response = request.nextUrl.searchParams
    const userId = response.get("id")

    if(!userId) {
        return new Response("USER ID is missing",{status:400})
    }
    const supabase = createClient()
    let user = null;

    try {
        const { data, error } = await supabase
            .from("Profile_info")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            throw error;
        }

        user = data;
    } catch (error:any) {
        console.error("Error fetching user:", error.message);
        return new Response("Error fetching user", { status: 500 });
    }
    return new Response(JSON.stringify(user))
}