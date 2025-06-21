import express from 'express';
import { getChat, getChatRoom, newChat, sendChat, shareChat } from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchatroom', protection, newChat);
router.get('/chatroom', protection, getChatRoom);
router.get('/sharechat', protection, shareChat);
router.post('/getchat', protection, getChat);
router.post('/sendchat', protection, sendChat);

export default router;