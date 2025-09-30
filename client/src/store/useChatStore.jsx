import { create } from "zustand";
import Instance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  currentRoom: null,
  messages: [],
  chatRooms: [],
  getMessageLoader:false,

  setCurrentRoom: (chatRoomId) => {
    set({currentRoom:chatRoomId});
    const socket= useAuthStore.getState().socket;
    socket.emit("joinRoom", chatRoomId);
},

  getMessage: async () => {
    set({getMessageLoader:true});
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
    } finally{
      set({getMessageLoader:false});
    }
  },

  createMsgCollection: async () => {
    try {
      const {currentRoom, setCurrentRoom, messages}=get();
      if ( currentRoom && (!messages || messages.length === 0)) return;
      const res = await Instance.get("/chat/newchatroom");
       setCurrentRoom(res.data);
       set({messages:[]});
       console.log(res.data)
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
  shareChat: async (userId) => {
    try {
      const {currentRoom}=get();
      await Instance.post("/chat/share",{
        userId,
        roomID:currentRoom
      });
      
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
      if(!roomId)return;
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
  
  realTimeConvertiate: () => {
    const { currentRoom } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket || !currentRoom) return;
    socket.on("newMsg", (newMsg) => {
      set((state) => ({
        messages: [...state.messages, newMsg],
      }));
    });
  },

  deleteRealTimeConvertiate: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMsg");
  },
  
}));
