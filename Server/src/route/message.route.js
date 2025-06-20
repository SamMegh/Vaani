import express from 'express';
import { getChat, newChat, sendChat } from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newchat', protection, newChat);
router.get('/getchat', protection, getChat);
router.post('/sendchat', protection, sendChat);

export default router;