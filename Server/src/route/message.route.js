import express from 'express';
import {getChatRooms, getChats, newChatRoom, sendMessage} from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchatroom',protection,newChatRoom);
router.get('/getchatrooms',protection,getChatRooms);
router.get('/getchats',protection,getChats);
router.post('/sendmessage',protection,sendMessage);

export default router;
