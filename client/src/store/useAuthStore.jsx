import { create } from "zustand";
import Instance from "../lib/axios";
import {io} from 'socket.io-client';


const MAINURL='http://localhost:8080/'
export const useAuthStore = create((set, get) => ({
  isAuthuser: null,
  isCheckauth: false,
  isSignout: false,
  isLogin: false,
  isSignup: false,
  socket: null,
  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await Instance.post("/auth/signin", data);
      set({ isAuthuser: res.data });
      get().connectSocket();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    } finally {
      set({ isLogin: false });
    }
  },

  signup: async (data) => {
    set({ isSignup: true });
    try {
      const res = await Instance.post("/auth/signup", data);
      if (res.status === 200) {
        set({ isAuthuser: res.data });
        get().connectSocket();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    } finally {
      set({ isSignup: false });
    }
  },

  signout: async () => {
    set({ isSignout: true });
    try {
      const res = await Instance.get("/auth/signout");
      if (!res) {
        console.log("unable to logout");
        return;
      }
      set({ isAuthuser: null });
     get().disconnectSocket();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
    } finally {
      set({ isSignout: false });
    }
  },

  checkauth: async () => {
    set({ isCheckauth: true });
    try {
      const res = await Instance.get("/auth/check");
      set({ isAuthuser: res.data });
     get().connectSocket();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.log(errorMessage);
      set({ isAuthuser: null });
    } finally {
      set({ isCheckauth: false });
    }
  },
  connectSocket: () => {
  const { isAuthuser } = get();

  // Don't reconnect if already connected
  if (!isAuthuser || get().socket?.connected) return;

  // 👇 Pass userId (or any user identifier) in query
  const socket = io(MAINURL.trim());

  set({ socket });
  
},
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },
}));
