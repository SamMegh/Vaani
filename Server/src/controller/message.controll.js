import { chatcomplete } from "../model/chatAi.model.js";
    

export const getChatRoom = (req, res) => {
    try {
        res.status(200).json("chatrooms");
    } catch {
        res.status(500).json('somthing went wronge')
    }
}


export const getChat = (req, res) => {
    try {
        res.status(200).json("chat");
    } catch {
        res.status(500).json('somthing went wronge')
    }
}


export const sendChat = async (req, res) => {
    try {
        const {prompt}= req.body;
        if(!prompt){
            return res.status(400).json({ error: "Prompt is required" });
        };
        const result= await chatcomplete(prompt);


        res.status(200).json(result);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}