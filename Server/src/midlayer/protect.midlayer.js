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
        req.user= await getUserByUID(decode.localId);
        next();
    } catch (error) {
        res.status(500).json({message: "internal server error"+error});
    }
}
import admin from "firebase-admin";


const getUserByUID = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);

    return {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || null,
      photoURL: userRecord.photoURL || null,
      emailVerified: userRecord.emailVerified,
      creationTime: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
