import jwt from 'jsonwebtoken'

export const protection= async(req,res, next)=>{
    try {
        const token= req.cookies.JWT
        if(!token){
            return res.status(401).json({message: "unauthroized access: no token provided"});
        }
        const decode=jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
             return res.status(401).json({message: "unauthroized access: invalid token provided"});
        }
        req.user={}
        req.user.uid=decode.localId;
        next();
    } catch (error) {
        res.status(500).json({message: "internal server error"+error});
    }
}