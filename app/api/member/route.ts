import { createClient } from "@/lib/supabase/client";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    const response = request.nextUrl.searchParams
    const projectId = response.get("projectid")
    const supabase = createClient()
    const res = await supabase.from("Member_table").select("*").eq("Project_id",projectId)
    return new Response(JSON.stringify(res))
}