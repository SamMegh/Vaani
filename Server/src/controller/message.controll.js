import { Convertiate } from "../model/gemini.model.js"; 


export const getChatRoom= (req,res)=>{
    try{
res.status(200).json("chatrooms");
}catch{
res.status(500).json('somthing went wronge')
}
}


export const getChat= (req,res)=>{
    try{
res.status(200).json("chat");
}catch{
res.status(500).json('somthing went wronge')
}
}


export const sendChat= async(req,res)=>{
    try{
        const {content}=req.body;
        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ message: 'Content cannot be empty.' });
        }
const data=await Convertiate(content);
console.log(json(data));
res.status(200).json("hello");
}catch (error) { 
    console.error("An error occurred:", error);
    res.status(500).json({ message: 'Something went wrong' }); 
}
}