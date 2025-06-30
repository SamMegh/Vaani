import mongoose from "mongoose";
import User from "../DBModels/user.model.js";

const messageSchema = new mongoose.Schema({
  senderid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});


const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Unnamed Chatroom'
  },
  admin: {
    type: String,
    required: true,
    ref:User
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});


const Message = mongoose.model("Message", messageSchema)
const Chatroom = mongoose.model('Chatroom', chatroomSchema);
export { Message, Chatroom }