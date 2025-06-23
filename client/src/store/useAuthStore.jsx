import { create } from "zustand";
import Instance from "../lib/axios";

const useAuthStore=create((set,get)=>({


    login:async(email,password)=>{
        const res=await Instance.get("/auth/login",{
            email,
            password
        })
    }
})
)