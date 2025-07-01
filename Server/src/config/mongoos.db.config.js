import mongoose from "mongoose";
export const connect = async () => {
    try {
        const user = process.env.MONGODB_USER;
        const pass = encodeURIComponent(process.env.MONGODB_PASS);
        const db = process.env.MONGODB_NAME;
        const MONGODB_URL = `mongodb+srv://${user}:${pass}@chatbot.jow6fvf.mongodb.net/${db}?retryWrites=true&w=majority`;
        const connection = await mongoose.connect(MONGODB_URL);
    } catch (error) {
        console.log("unable to connected with database " + error);

    }
}