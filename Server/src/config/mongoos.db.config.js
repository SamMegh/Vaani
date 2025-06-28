import mongoose from "mongoose";
export const connect= async ()=>{
        try {
            const connection= await mongoose.connect(process.env.MONGODB_URL);
            console.log("connected to database "+ connection.connection.host)
        } catch (error) {
            console.log("unable to connected with database " + error);
            
        }
}