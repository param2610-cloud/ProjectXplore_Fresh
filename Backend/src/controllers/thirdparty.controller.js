import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const techNewsApi = asyncHandler(async (req, res, next) => {
    const url = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=1b0c7c052e39456e91424a89e6bf88ed";
    
    try {
        const response = await fetch(url);
        const result =await response.json();
        return res.status(200).json(new ApiResponse(200,result,"Fetched"))
    } catch (error) {
        console.error(error);
    }
});
export {techNewsApi}