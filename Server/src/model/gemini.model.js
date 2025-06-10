import { GoogleGenerativeAI } from '@google/generative-ai'; 
import dotenv from 'dotenv'
dotenv.config();
const ai=new GoogleGenerativeAI({apiKey:process.env.GoogleGeminiAPI});

console.log(process.env.GoogleGeminiAPI);
export async function Convertiate(content){
  try {
   const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const result= model.generateContent(content);
    const response= await result.response;
    const text= response.text();
  console.log(response);
 return text;
  } catch (error) {
    console.log(error);
  }
}