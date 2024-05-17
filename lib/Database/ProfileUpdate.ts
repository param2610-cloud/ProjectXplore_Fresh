
import { UserProfile } from "../interface/UserProfile";
import { createClient } from "../supabase/client";
// import { supabaseUrl } from "../utils/constants";

// export const ProfileTextUpdate = async (UpdateData: UserProfile) => {
//   const supabase = createClient();
//   const ProfileId = UpdateData.id;

//   const { data, error } = await supabase
//     .from("Profile_info")
//     .insert([
//         { 
//             Full_name: UpdateData.Full_Name, 
//             : "otherValue" 
//         }
//     ])
//     .select();
// };



export async function ProfileImageUpdate (prevUrl:string,SelectedData:string) {
    const supabase = createClient()
    const {data,error} =await supabase.storage.from('Projectxplore_image_store').upload(prevUrl,SelectedData)
    if(error){
        console.log(error)
        const returndata = {
            error: true,
            title:error.name,
            message: error.message
        }
        return JSON.stringify(data)
    }
    else{
        const returndata = {
            error: false,
            newUrl:data.path
        }
        return JSON.stringify(returndata)
    }
}