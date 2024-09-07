import axios from "axios"
import { Domain } from "../Domain"

export const Req_send_handler = async (teamId: string, userId: string) => {
    try {
        if(teamId && userId){

            const data = await axios.post(`${Domain}/api/v1/team/team-req-send`,{
                teamId:teamId,
                userId:userId
            })
            if(data.status===201){
                console.log("Submitted");
                return true
            }
        }
        
        console.log("Not Submitted");
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}