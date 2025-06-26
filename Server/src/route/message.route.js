import express from 'express';
import { addusermessage, getChat, getChatRoom, MessageRooms, sendChat, shareChat } from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchatroom', protection, MessageRooms);
router.get('/getchatroom', protection, getChatRoom);
router.get('/sharechat', protection, shareChat);
router.post('/getchat', protection, getChat);
router.post('/sendchat', protection, sendChat);
router.post('/addusermessage', protection, addusermessage);

export default router;