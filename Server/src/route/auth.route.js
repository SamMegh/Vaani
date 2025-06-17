import express from 'express';
import {check, signin, signout, signup} from '../controller/auth.controll.js'
import { protection } from '../midlayer/protect.midlayer.js';
const router= express.Router();

router.get("/signin", signin);
router.get("/signup", signup);
router.get("/signout",protection, signout);
router.get("/check",protection, check);
 
export default router;