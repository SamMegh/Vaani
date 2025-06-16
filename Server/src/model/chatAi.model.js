import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function chatcomplete(content) {
  const chatCompletion = await getGroqChatCompletion(content);
  const reply=(chatCompletion.choices[0]?.message?.content || "");
  return reply;
}

export async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:content,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
