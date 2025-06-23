import { create } from "zustand";
import Instance from "../lib/axios";

export const useAuthStore=create((set,get)=>({
    isAuthuser:null,


    login: async (data) => {
        try {
            const res = await Instance.post('/auth/signin', data);
            set({ isAuthuser: res.data });
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            console.log(errorMessage)
        } 
    },
})
)