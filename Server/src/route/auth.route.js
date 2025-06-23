import express from 'express';
import {check, signin, signout, signup} from '../controller/auth.controll.js'
import { protection } from '../midlayer/protect.midlayer.js';
const router= express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout",protection, signout);
router.post("/check",protection, check);
 
export default router;