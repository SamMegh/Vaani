import { create } from "zustand";
import Instance from "../lib/axios";
export const useAuthStore = create((set, get) => ({
  isAuthuser: null,
  isCheckauth:false,
  isSignout:false,
  isLogin:false,
  isSignup:false,
  login: async (data) => {
    set({isLogin:true});
    try {
      const res = await Instance.post("/auth/signin", data);
      set({ isAuthuser: res.data.user });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    }finally{
    set({isLogin:false});
    }
  },

  signup: async (data) => {
    set({isSignup:true})
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
    }finally{
    set({isSignup:false})
    }
  },

  signout:async ()=>{
    set({isSignout:true})
    try {
        const res=await Instance.get("/auth/signout");
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
    }finally{
    set({isSignout:false})
    }
  },

  checkauth:async ()=>{
    set({isCheckauth:true})
try {
  const res = await Instance.get("/auth/check");
  set({isAuthuser:res.data})
} catch (error) {
   const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
      set({isAuthuser:null})
}finally{
  set({isCheckauth:false})
}
  }
}));
