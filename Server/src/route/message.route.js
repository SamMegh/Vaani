import express from 'express';
import {getChatRooms, newChatRoom, sendMessage} from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchatroom',protection,newChatRoom);
router.get('/getchatrooms',protection,getChatRooms);
router.get('/getchatrooms',protection,getChatRooms);
router.post('/sendmessage',protection,sendMessage);

export default router;
