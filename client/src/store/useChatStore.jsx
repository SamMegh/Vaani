import { create } from "zustand";
import Instance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  currentRoom: "HEhuSQRgmiqxQ5thF6te",
  messages: [],
  chatRooms: [],
  setCurrentRoom: () => {
    const socket = useAuthStore.getState().socket;
    const { currentRoom } = get();
    if (socket && currentRoom) {
      // Join new room
      socket.emit("joinRoom", currentRoom);
    }

    set({ currentRoom: currentRoom });
  },

  getMessage: async () => {
    const { currentRoom } = get();
    if (!currentRoom) return;

    try {
      const res = await Instance.post("/chat/getchat", {
        roomId: currentRoom,
      });
      set({ messages: res.data });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.error("Error fetching messages:", errorMessage);
    }
  },

  createMsgCollection: async () => {
    try {
      const res = await Instance.get("/chat/newchatroom");
      set({ currentRoom: res.data });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },

  getMessageCollection: async () => {
    try {
      const res = await Instance.get("/chat/getchatroom");
      set({ chatRooms: res.data });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },

  sendMessage: async (msg) => {
    const { currentRoom, createMsgCollection } = get();
    try {
      let roomId = currentRoom;
      if (!roomId) {
        await createMsgCollection();
        roomId = get().currentRoom;
      }

      const userRes = await Instance.post("/chat/addusermessage", {
        prompt: msg,
        roomId,
      });
      set((state) => ({
        messages: [...state.messages, userRes.data],
      }));

      const assisRes = await Instance.post("/chat/sendchat", {
        prompt: msg,
        roomId,
      });
      set((state) => ({
        messages: [...state.messages, assisRes.data],
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log("Error sending message:", errorMessage);
    }
  },
  
  realTimeConvertiate: () => {
    const { currentRoom } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket || !currentRoom) return;

    socket.on("newMsg", (newMsg) => {
      console.log("New message from socket:", newMsg);
      set((state) => ({
        messages: [...state.messages, newMsg],
      }));
    });
  },

  deleteRealTimeConvertiate: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMsg");
  },
}));
