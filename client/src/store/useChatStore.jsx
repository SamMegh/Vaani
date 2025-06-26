import { create } from "zustand";
import Instance from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  currentRoom:null,
  chatRooms:[],

  sendMessage: async (msg) => {
  const {  currentRoom, createMsgCollection,messages } = get();

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
    set({ messages: [...messages, ...res.data] });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong!";
    console.log("Error sending message:", errorMessage);
  }
  },

  getMessage: async () => {
  try {
    const { currentRoom } = get();
    const res = await Instance.post("/chat/getchat", { roomId:currentRoom });

    set({ messages: res.data });
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong!";
    console.error("Error fetching messages:", errorMessage);
  }
  },

  createMsgCollection:async()=>{
    try {
      const res = await Instance.get("/chat/newchatroom");
      set({currentRoom:res.data});
      console.log(res.data);
    } catch (error) {
       const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },

  getMessageCollection:async()=>{
    try {
      const res = await Instance.get("/chat/getchatroom");
      set({chatRooms:res.data});
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  }
}));
