import { chatcomplete } from "../model/chatAi.model.js";
import Message from "../DBModels/message.model.js";
import Chatroom from "../DBModels/chatRoom.model.js";
import { io } from "../lib/socket.js";

const addToDB = async (senderid, name, msg, roomID) => {
    try {
        if (!msg || !roomID || !name || !senderid) return;
        const newMsg = new Message({
            senderid,
            name,
            message: msg,
            roomID
        });
        await newMsg.save();

        io.to(roomID).emit("newMsg", newMsg);

        const chatroom = await Chatroom.findById(roomID);

        if (!chatroom) {
            console.log("Chatroom not found");
            return;
        }

        chatroom.messages.push(newMsg._id); // Add message ID to messages array
        await chatroom.save();

        return newMsg;
    } catch (error) {
        console.log("unable to add message to Db " + error);
    }
}

const createNewChatRoom = async (admin) => {
    try {
        const newChatRoom = new Chatroom({
            admin,
            participants: [admin]
        });
        await newChatRoom.save();
        return newChatRoom;
    } catch (error) {
        console.log("unable to create chatRoom " + error);
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { senderid, name, msg, roomID } = req.body;
        await addToDB(senderid, name, msg, roomID)
        const aiResponse = await chatcomplete(msg);
        await addToDB("PrivateAssistantGroq", "Vaani", aiResponse, roomID);
        res.status(200).json("message added successful");
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const newChatRoom = async (req, res) => {
    try {
        const admin = req.user._id;
        const roomId = await createNewChatRoom(admin);
        res.status(200).json(roomId._id);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const getChatRooms = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatrooms = await Chatroom.find({ participants: { $in: [userId] } }).sort({ createdAt: -1 });
        if (!chatrooms) {
            return res.status(200).json();
        }
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const getChats = async (req, res) => {

    try {
        const { roomID } = req.body;
        const chatroom = await Chatroom.findById(roomID);
        if (!chatroom) {
            return res.status(404).json({ message: "Chatroom not found" });
        }
        const userId = req.user._id.toString();
        const isParticipant = chatroom.participants.some(
            (participant) => participant.toString() === userId
        );

        if (!isParticipant) {
            return res.status(401).json("Not your chatroom");
        }
        const messages = await Message.find({
            _id: { $in: chatroom.messages }
        }).sort({ createdAt: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const share = async (req, res) => {
    try {
        const { userId, roomID } = req.body;
        const admin = req.user._id;

        const chatroom = await Chatroom.findById(roomID);

        if (!chatroom) {
            return res.status(404).json({ message: "Chatroom not found." });
        }

        if (admin.toString() !== chatroom.admin.toString()) {
            return res.status(401).json({ message: "You are not allowed to add users to this chatroom." });
        }

        // Prevent duplicate
        if (chatroom.participants.includes(userId)) {
            return res.status(400).json({ message: "User is already a participant in this chatroom." });
        }

        chatroom.participants.push(userId);
        await chatroom.save();

        return res.status(200).json({ message: "User added to this chatroom." });

    } catch (error) {
        res.status(500).json({ message: "Internal server error: " + error.message });
    }
}
