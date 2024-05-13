import { createClient } from "@/lib/supabase/client";


export async function myProjectIdeafetch(profileUid:string) {
    try {
        const supabase = createClient()
        const data =await supabase.from('Project_info').select("*").eq("Profile_id",profileUid)
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function myProjectCollecfetch(profileUid:string) {
    try {
        const supabase = createClient()
        const data =await supabase.from('Project_info').select("*").eq("Profile_id",profileUid)
        return data
    } catch (error) {
        console.log(error)
    }
}