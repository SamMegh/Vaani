import mongoose from "mongoose";
import Message from "../DBModels/message.model.js";
import User from "../DBModels/user.model.js";
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
  participants: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: User
}],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Message
  }]
},
{
  timestamps:true
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);
export default Chatroom