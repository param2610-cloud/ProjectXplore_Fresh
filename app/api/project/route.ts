import { createClient } from "@/lib/supabase/client";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const response = request.nextUrl.searchParams
    const Id = response.get("id")
    const supabase = createClient()
    const res = await supabase.from("Project_info").select("*").eq("Project_id",Id)
    return new Response(JSON.stringify(res))
}