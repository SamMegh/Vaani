import express from 'express';
import { getChat, getChatRoom, sendChat } from '../controller/message.controll.js';

const router=express.Router();

router.get('/chatroom',getChatRoom);
router.get('/getchat',getChat);
router.get('/sendchat',sendChat);

export default router;