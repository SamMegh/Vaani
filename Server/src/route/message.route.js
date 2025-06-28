import express from 'express';
import {
  createChatRoom,
  getUserChatRooms,
  getRoomMessages,
  shareChatRoom,
  addUserMessage,
  sendChatToAI
} from '../controller/message.controll.js';

import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

// Create a new chat room
router.post('/createchatroom', protection, createChatRoom);

// Get all chat rooms of a user
router.get('/getuserchatrooms', protection, getUserChatRooms);

// Get all messages in a chat room
router.post('/getroommessages', protection, getRoomMessages);

// Share a chat room with a new user
router.post('/sharechatroom', protection, shareChatRoom);

// Add user message to room
router.post('/addusermessage', protection, addUserMessage);

// Send chat to AI and store response
router.post('/sendchattogpt', protection, sendChatToAI);

export default router;
