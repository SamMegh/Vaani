import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderid: {
        type: String,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        ref: "User",
        default:'unKnown'
    },
    message: {
        type: String,
    },
}, {
    timestamps: true
});


const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});


const Message= mongoose.model("Message",messageSchema)
const Chatroom = mongoose.model('Chatroom', chatroomSchema);
export {Message,Chatroom}