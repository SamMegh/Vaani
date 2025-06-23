import { create } from 'zustand';
import Instance from "../lib/axios"
export const useChatStore = create((set, get) => ({
  messages: [],

  addMessage:(msg)=>{
    const messages=get().messages;
    set({messages:[...messages,msg]});
  },

  sendMessage:async(msg)=>{
    const addMessage=get().addMessage;
    const res= await Instance.post('/chat/sendchat', {
  prompt: msg
});
console.log(res.data);
addMessage({role: 'assistant', content: res.data });
  }




}
));
