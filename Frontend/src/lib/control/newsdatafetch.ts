import axios from "axios"
import { domain } from "../domain"

export const newsDataFetch =async ()=>{
    const response  =await axios.get(`${domain}/api/v1/third-party/tech-news`)
    return response
}