import express from 'express';
import {check, signin, signout, signup} from '../controller/auth.controll.js'
const router= express.Router();

router.get("/signin", signin);
router.get("/signup", signup);
router.get("/signout", signout);
router.get("/check", check);
 
export default router;