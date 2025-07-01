import { create } from "zustand";
import Instance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  currentRoom: "6862d9abf4e8d12e8072b3bf",
  messages: [],
  chatRooms: [],
  // setCurrentRoom: () => {
  //   const socket = useAuthStore.getState().socket;
  //   const { currentRoom } = get();
  //   if (socket && currentRoom) {
  //     // Join new room
  //     socket.emit("joinRoom", currentRoom);
  //   }

  //   set({ currentRoom: currentRoom });
  // },

  getMessage: async () => {
    const { currentRoom } = get();
    if (!currentRoom) return;

    try {
      const res = await Instance.post("/chat/getchats", {
        roomID: currentRoom,
      });
      set({ messages: res.data.messages });

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
      const res = await Instance.get("/chat/getchatrooms");
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
    const isAuthuser = useAuthStore.getState().isAuthuser;
    try {
      if(!isAuthuser)return;
      let roomId = currentRoom;
      if (!roomId) {
        await createMsgCollection();
        roomId = get().currentRoom;
      }

      await Instance.post("/chat/sendmessage", {
        senderid:isAuthuser._id,
        name:isAuthuser.name,
        msg,
        roomID:roomId,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log("Error sending message:", errorMessage);
    }
  },
  
  // realTimeConvertiate: () => {
  //   const { currentRoom } = get();
  //   const socket = useAuthStore.getState().socket;
  //   if (!socket || !currentRoom) return;

  //   socket.on("newMsg", (newMsg) => {
  //     console.log("New message from socket:", newMsg);
  //     set((state) => ({
  //       messages: [...state.messages, newMsg],
  //     }));
  //   });
  // },

  // deleteRealTimeConvertiate: () => {
  //   const socket = useAuthStore.getState().socket;
  //   socket.off("newMsg");
  // },
}));
