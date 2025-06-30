import { chatcomplete } from "../model/chatAi.model.js";
import Message  from "../DBModels/message.model.js";
import Chatroom from "../DBModels/chatRoom.model.js";

const addToDB= async(senderid,name,msg, roomID)=>{
    try {
        if(!msg||!roomID||!name)return;
        const newMsg= new Message({
            senderid,
            name,
            message:msg
        });
        if(!newMsg){console.log("unable to create message");}
        await newMsg.save();

        const chatroom = await Chatroom.findById(roomID);

        if (!chatroom) {
            console.log("Chatroom not found");
            return;
        }

        chatroom.messages.push(newMsg._id); // Add message ID to messages array
        await chatroom.save(); 

        return newMsg;
    } catch (error) {
        console.log("unable to add message to Db "+ error);
    }
}

const createNewChatRoom= async(admin)=>{
try {
    const newChatRoom=new Chatroom({
        admin,
        participants:[admin] 
    });
    await newChatRoom.save();
    return newChatRoom;
} catch (error) {
 console.log("unable to create chatRoom "+error);   
}
}

export const sendMessage= async(req,res)=>{
    try {
        const {senderid,name,msg, roomID}=req.body;
        await addToDB(senderid,name,msg, roomID)
        const aiResponse= await chatcomplete(msg);
        await addToDB("PrivateAssistantGroq", "Assistant",aiResponse,roomID);
        res.status(200).json("message added successful");
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const newChatRoom= async(req,res)=>{
    try {
        const admin= req.user._id;
        const roomId =await createNewChatRoom(admin);
        res.status(200).json(roomId._id);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const getChatRooms= async(req,res)=>{
    try {
        const userId = req.user._id;
        const chatrooms = await Chatroom.find({ participants: userId });
        if(!chatrooms){
            return res.status(200).json();
        }
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const getChats= async(req,res)=>{

    try {
        const {roomID}= req.body;
        const chatroom= await Chatroom.findById(roomID);
        if (chatroom.admin.toString() !== req.user._id.toString()||!chatroom) {
            return res.status(401).json("Not your chatroom");
        }
        const messages = await Message.find({
            _id: { $in: chatroom.messages }
            }).sort({ createdAt: -1 });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const share= async(req,res)=>{
    try {
        const {userId,roomID}=req.body;
        const admin= req.user._id;
        const chatroom= await Chatroom.findById(roomID);

        if(admin.toString!==chatroom.admin.toString()||!chatroom){
            return res.status(401).json({message:"your are not able to add user to this chat room."});
        }
        const result = await chatroom.participants.push(userId);
        if(!result){
            return res.status(401).json({message:"unable to add user to this chat room."});
        }
            return res.status(200).json({message:"user added to this chat room"});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}
