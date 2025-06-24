import { create } from "zustand";
import Instance from "../lib/axios";
export const useAuthStore = create((set, get) => ({
  isAuthuser: null,
  isCheckauth:false,

  login: async (data) => {
    try {
      const res = await Instance.post("/auth/signin", data);
      set({ isAuthuser: res.data.user });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },

  signup: async (data) => {
    try {
      const res = await Instance.post("/auth/signup", data);
      if (res.status === 200) {
        set({ isAuthuser: res.data.user });
      }
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },

  signout:async ()=>{
    try {
        const res=Instance.get("/auth/signout");
        if(!res){
          console.log("unable to logout");
          return ;
        }
        set({isAuthuser:null});
    } catch (error) {
        
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }
  },

  checkauth:async ()=>{
    set({isCheckauth:true})
try {
  const res = await Instance.get("/auth/check");
  console.log(res.data);
  set({isAuthuser:res.data})
} catch (error) {
   const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
}finally{
  set({isCheckauth:false})
}
  }
}));
