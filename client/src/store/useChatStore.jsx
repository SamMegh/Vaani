import { create } from "zustand";
import Instance from "../lib/axios";
export const useChatStore = create((set, get) => ({
  messages: [],
  currentRoom:null,
sendMessage: async (msg) => {
  const {  currentRoom, createMsgCollection } = get();

  try {
    // If no room exists, create one
    let roomId = currentRoom;
    if (!roomId) {
      await createMsgCollection();
      roomId = get().currentRoom; 
    }

    const res = await Instance.post("/chat/sendchat", {
      prompt: msg,
      roomId,
    });

    addMessage({ role: "assistant", content: res.data });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong!";
    console.log("Error sending message:", errorMessage);
  }
},

  createChatRoom:async()=>{
    try {
    const res = await Instance.get("/chat/newchatroom");
    console.log(res.data);      
    } catch (error) {
        const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },
  getMessage:async()=>{
    try {
      const res= await Instance.post("/chat/getchat",{
        roomId:"zhrC5jzyJxcNXl13oM1G"
      });
      set({messages:res.data})
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }

  },
  createMsgCollection:async()=>{
    try {
      const res = await Instance.get("/chat/newchatroom");
      set({currentRoom:res.data});
    } catch (error) {
       const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  }
}));
