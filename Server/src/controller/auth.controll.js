import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig.js";
import { generatorToken } from "../lib/tokenGenerator.jwt.js";
export const signin= async(req,res)=>{
    try {
        const {email, password}=req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be atleast 6 characters long' });
        }
        const userData=await signInWithEmailAndPassword(auth,email,password);
        if(!userData){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        generatorToken(userData.user.uid,res,email);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
    
}
export const signup= async (req,res)=>{
    try {
        const {email, password}=req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be atleast 6 characters long' });
        }

        const userData= await createUserWithEmailAndPassword(auth, email, password)
        if(!userData){
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        generatorToken(userData.user.uid,res,email);
        res.status(200).json({userData});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const signout = (req, res) => {
    try {
        const token = req.cookies.JWT;
        if (!token) {
            return res.status(400).json({ message: 'User not logged in' });
        }
        res.cookie('JWT', '', { maxAge: 1 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
    }
}

export const check=(req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' + error });
    }
}




