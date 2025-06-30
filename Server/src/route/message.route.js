import express from 'express';
import {newChatRoom} from '../controller/message.controll.js';
import { protection } from '../midlayer/protect.midlayer.js';

const router = express.Router();

router.get('/newChatRoom',protection,newChatRoom);

export default router;
