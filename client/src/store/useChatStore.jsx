import { create } from "zustand";
import { persist } from "zustand/middleware";
import Instance from "../lib/axios";

export const useChatStore = create(
  persist(
    (set, get) => ({
      currentRoom: null,
      messages: [],
      chatRooms: [],

      setCurrentRoom: (roomId) => set({ currentRoom: roomId }),

      getMessage: async () => {
        const { currentRoom } = get();

        try {
          if (!currentRoom) return;

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

          const userres = await Instance.post("/chat/addusermessage", {
            prompt: msg,
            roomId,
          });
           set((state) => ({
      messages: [...state.messages, userres.data],
    })); // Append both user message

          

          const assisres = await Instance.post("/chat/sendchat  ", {
            prompt: msg,
            roomId,
          });
           set((state) => ({
      messages: [...state.messages, assisres.data],
    })); // Append both assistant message


        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong!";
          console.log("Error sending message:", errorMessage);
        }
      },

    }),
    {
      name: "chat-storage", // Key in localStorage
      partialize: (state) => ({
        currentRoom: state.currentRoom,
        messages: state.messages,
      }),
    }
  )
);
