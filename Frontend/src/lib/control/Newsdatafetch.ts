import axios from "axios"
import { Domain } from "../Domain"

export const newsDataFetch =async ()=>{
    const response  =await axios.get(`${Domain}/api/v1/third-party/tech-news`)
    return response
}