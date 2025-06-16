import { chatcomplete } from "../model/openAi.model.js";



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
        const prompt= res.body;
        if(prompt===null||prompt===undefined)return;
        chatcomplete(prompt);


        res.status(200).json("hello");
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}