import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);