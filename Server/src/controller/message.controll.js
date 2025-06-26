import { chatcomplete } from "../model/chatAi.model.js";
import db from "../config/firebase.db.Config.js";
import { text } from "express";
import admin from 'firebase-admin';

const newmessage = async (senderId, prompt, rool, roomId) => {
    // add message to database
    try {
        if (!text || !senderId || !roomId) {
            return res.status(400).json({ message: 'Message text, RoomId and sender ID are required' });
        }
        const createdAt = admin.firestore.FieldValue.serverTimestamp();
        const messageData = {
            prompt,
            senderId,
            rool,
            createdAt,
        };

        const messageRef = await db
            .collection('MessageRooms').doc(roomId)
            .collection('Messages')
            .add(messageData);
        const savedMsg = await messageRef.get();

        return { id: savedMsg.id, ...savedMsg.data() };
    } catch (error) {
        return ({ message: 'Error sending message', error: error.message });
    }
}

export const MessageRooms = async (req, res) => {
    ///create new message room
    const owner = req.user.uid;
    const createdAt = admin.firestore.FieldValue.serverTimestamp();
    try {
        const messageroomRef = await db.collection('MessageRooms').add({
            owner,
            participantId: [owner],
            participantName: [owner],
            createdAt,
        });
        res.status(200).json(messageroomRef.id);
    } catch (error) {
        res.status(500).json("error while creating new chat" + error);
    }
}

export const getChatRoom = async (req, res) => {
    // to get all chatroom of the current user

    try {
        const userId = req.user.uid;
        const chatroomsref = await db.collection("MessageRooms").where("participantId", "array-contains", userId).get();
        const chatrooms = chatroomsref.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt?.toDate() || null,
            }
        });
        res.status(200).json(chatrooms);

    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong while getting the chat.',
            details: error.message,
        });
    }
}

export const getChat = async (req, res) => {
    // to get data of specific chat room 

    try {
        const { roomId } = req.body;
        if (!roomId) {
            return res.status(400).json({ error: 'roomId is required' });
        }
        const msgsnapshot = await db
            .collection('MessageRooms')
            .doc(roomId)
            .collection('Messages')
            .orderBy('createdAt', 'asc')
            .get();

        const msg = msgsnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                ...data,
                createdAt: data.createdAt?.toDate() || null,
            }
        });
        res.status(200).json(msg); // ✅ send the response
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong while getting the chat.',
            details: error.message,
        });
    }
};

export const shareChat = async (req, res) => {
    try {
        const { roomId, newUserId } = req.body;
        if (!roomId || !newUserId) {
            return res.status(400).json("user id and room id required");
        }
        const currentUser = req.user.uid;
        const roomref = await db.collection("MessageRooms").doc(roomId);
        const roomrefdata = await roomref.get();
        if (!roomrefdata.exists) {
            return res.status(400).json("invalid room id");
        }
        const roomdata = await roomrefdata.data();
        if (roomdata.owner !== currentUser) {
            return res.status(401).json("only admin can add new memmbers");
        }
        await roomref.update({
            participantId: admin.firestore.FieldValue.arrayUnion(newUserId),
        });
        res.status(200).json("new user added");
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Something went wrong' + error });
    }
}

export const addusermessage= async(req,res)=>{
    try {
         const { prompt, roomId } = req.body;
        if (!prompt||!roomId ) {
            return res.status(400).json({ error: "Prompt or RoomId is required" });
        };
        const userDone = await newmessage(req.user.uid, prompt, "user", roomId);
        return res.status(200).json(userDone);
    } catch (error) {
         console.error("An error occurred:", error);
        res.status(500).json({ message: 'Something went wrong' + error });
    }
}

export const sendChat = async (req, res) => {
    try {
        const { prompt, roomId } = req.body;
        if (!prompt||!roomId ) {
            return res.status(400).json({ error: "Prompt or RoomId is required" });
        };
            const result = await chatcomplete(prompt);
            const assistantDone = await newmessage("AssitantReplyGroq", result, "assistant", roomId);
            return res.status(200).json(assistantDone);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: 'Something went wrong' + error });
    }
}
