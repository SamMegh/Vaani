import express from 'express';
import {getChatRooms, getChats, newChatRoom, sendMessage, share} from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchatroom',protection,newChatRoom);//does't required any parameter
router.get('/getchatrooms',protection,getChatRooms);//does't required any parameter
router.get('/getchats',protection,getChats);//required { roomID }
router.post('/share',protection,share);//required { roomID, userId } to success
router.post('/sendmessage',protection,sendMessage);// requirement for user message {senderid,name,msg, roomID} and for assistant do nothing

export default router;
