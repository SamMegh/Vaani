import { chatcomplete } from "../model/chatAi.model.js";
import db from "../config/firebase.db.Config.js";
import admin from 'firebase-admin';
import { io } from "../lib/socket.js";

// Helper: Send and store a new message in Firestore
const createMessage = async (senderId, content, role, roomId) => {
    if (!content || !senderId || !roomId) {
        return { status: 400, message: 'Prompt, senderId, and roomId are required' };
    }

    try {
        const createdAt = admin.firestore.FieldValue.serverTimestamp();
        const messageData = { prompt: content, senderId, rool: role, createdAt };

        const messageRef = await db.collection('MessageRooms')
            .doc(roomId)
            .collection('Messages')
            .add(messageData);

        const newMessageDoc = await messageRef.get();
        const newMessage = { id: newMessageDoc.id, ...newMessageDoc.data() };

        io.to(roomId).emit("newMsg", newMessage);
        return { status: 200, message: "Message sent successfully", data: newMessage };
    } catch (error) {
        return { status: 500, message: 'Error sending message', error: error.message };
    }
};

// Create a new chat room
export const createChatRoom = async (req, res) => {
    const owner = req.user.uid;
    const createdAt = admin.firestore.FieldValue.serverTimestamp();

    try {
        const roomRef = await db.collection('MessageRooms').add({
            owner,
            participantId: [owner],
            participantName: [owner],
            createdAt,
        });

        res.status(200).json({ roomId: roomRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat room', error: error.message });
    }
};

// Get all chat rooms of a user
export const getUserChatRooms = async (req, res) => {
    const userId = req.user.uid;

    try {
        const chatRoomsSnap = await db.collection("MessageRooms")
            .where("participantId", "array-contains", userId)
            .get();

        const rooms = chatRoomsSnap.docs.map(doc => ({
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || null
        }));

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching chat rooms',
            error: error.message
        });
    }
};

// Get all messages in a specific chat room
export const getRoomMessages = async (req, res) => {
    const { roomId } = req.body;

    if (!roomId) {
        return res.status(400).json({ error: 'roomId is required' });
    }

    try {
        const messagesSnap = await db
            .collection('MessageRooms')
            .doc(roomId)
            .collection('Messages')
            .orderBy('createdAt', 'asc')
            .get();

        const messages = messagesSnap.docs.map(doc => ({
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || null
        }));

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching chat messages',
            error: error.message
        });
    }
};

// Share a chat room with a new user
export const shareChatRoom = async (req, res) => {
    const { roomId, newUserId } = req.body;
    const currentUser = req.user.uid;

    if (!roomId || !newUserId) {
        return res.status(400).json({ message: 'roomId and newUserId are required' });
    }

    try {
        const roomRef = db.collection("MessageRooms").doc(roomId);
        const roomDoc = await roomRef.get();

        if (!roomDoc.exists) {
            return res.status(404).json({ message: 'Invalid roomId' });
        }

        const roomData = roomDoc.data();
        if (roomData.owner !== currentUser) {
            return res.status(403).json({ message: 'Only the owner can add new members' });
        }

        await roomRef.update({
            participantId: admin.firestore.FieldValue.arrayUnion(newUserId),
        });

        res.status(200).json({ message: 'New user added to the room' });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing chat room', error: error.message });
    }
};

// Add a user-generated message
export const addUserMessage = async (req, res) => {
    const { prompt, roomId } = req.body;

    if (!prompt || !roomId) {
        return res.status(400).json({ error: "Prompt and roomId are required" });
    }

    try {
        const response = await createMessage(req.user.uid, prompt, "user", roomId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error sending user message', error: error.message });
    }
};

// Add AI assistant message based on user input
export const sendChatToAI = async (req, res) => {
    const { prompt, roomId } = req.body;

    if (!prompt || !roomId) {
        return res.status(400).json({ error: "Prompt and roomId are required" });
    }

    try {
        const aiResponse = await chatcomplete(prompt);
        const response = await createMessage("AssistantReplyGroq", aiResponse, "assistant", roomId);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error sending AI response', error: error.message });
    }
};
