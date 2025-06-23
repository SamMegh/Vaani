import { create } from "zustand";
import Instance from "../lib/axios";

export const useAuthStore=create((set,get)=>({
    isAuthuser:null,


    login: async (email,password) => {
        try {
            const res = await Instance.post('/auth/signin', {
                email,
                password
            });
            set({ isAuthuser: res.data });
            get().socketConnect();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            set({ isLogin: false });
        }
    },
})
)