import { create } from "zustand";
import Instance from "../lib/axios";
export const useChatStore = create((set, get) => ({
  messages: [],

  addMessage: (msg) => {
    const messages = get().messages;
    set({ messages: [...messages, msg] });
  },

  sendMessage: async (msg) => {
    const addMessage = get().addMessage;
    const res = await Instance.post("/chat/sendchat", {
      prompt: msg,
    });
    console.log(res.data);
    addMessage({ role: "assistant", content: res.data });
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

  }
}));
