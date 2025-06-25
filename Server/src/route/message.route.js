import express from 'express';
import { getChat, getChatRoom, MessageRooms, sendChat, shareChat } from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchatroom', protection, MessageRooms);
router.get('/chatroom', protection, getChatRoom);
router.get('/sharechat', protection, shareChat);
router.post('/getchat', protection, getChat);
router.post('/sendchat', protection, sendChat);

export default router;