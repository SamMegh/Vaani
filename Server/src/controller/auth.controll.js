import User from "../DBModels/user.model.js";
import bcrypt from 'bcrypt';
import { generatorToken } from "../lib/tokenGenerator.jwt.js";

export const signup = async (req, res) => {
    try {
        const {email, password, name}= req.body;
        if(!email || !password || !name){
           return res.status(401).json({ message: "all fields are required"});
        }
        if(password<6){
            return res.status(401).json({ message: "password must be atleast 6 characters long"});            
        }
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message:"user already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            email,
            password:hashPassword
        });
        if(newUser){
            generatorToken(newUser._id,res);
            await newUser.save();
           return res.status(200).json({
                _id: newUser._id,
                email:newUser.email,
                name:newUser.name
            });
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error" + error });
    }
}
export const signin = async(req,res) => {
    try {
        const {email, password}= req.body;
        if(!email||!password){
            return res.status(401).json({ message: "all fields are required"});
        }
        if(password<6){
            return res.status(401).json({ message: "password must be atleast 6 characters long"});            
        }
        const reqUser= await User.findOne({email});
        if(!reqUser){
            return res.status(401).json({ message: "user not found"}); 
        }
        const iscorrect= await bcrypt.compare(password, reqUser.password);
        if(!iscorrect){
            return res.status(401).json({ message: "invalid email or password"}); 
        }
        generatorToken(reqUser._id,res);
        res.status(200).json({
                _id: reqUser._id,
                email:reqUser.email,
                name:reqUser.name
            });
        
    } catch (error) {
        res.status(500).json({ message: "internal server error" + error });
    }
}
export const signout = (req,res) => {
    try {
        if(!req.cookies.JWT){
            return res.status(401).json({ message: "no user loged In"}); 
        }
        req.cookies('JWT','',{maxAge:1});
        res.status(200).json({ message: "successfully logout"}); 
    } catch (error) {
        res.status(500).json({ message: "internal server error" + error });
    }
}
export const check = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "internal server error" + error });
    }
}