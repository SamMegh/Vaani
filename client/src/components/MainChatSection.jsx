import { useState } from "react";
import CustomInputBox from "./customInputBox";
import ListOfMessages from "./listOfMessages";
import CustomButton from "./customButton";
import { useChatStore } from "../store/useChatStore.jsx";

const MainChatSection = () => {
     const [msg, setMsg] = useState("");
  const {addMessage,sendMessage}=useChatStore();
  const handleSend = () => {
    if (msg.trim) {
      addMessage({ role: 'user', content: msg });
      sendMessage(msg);
    }
  };
  return (
    <div className='chat-main'>
      <ListOfMessages />
      <h1>result</h1>
      <CustomInputBox input={msg} setInput={setMsg} />
      <CustomButton onClick={handleSend} />
    </div>
  )
}

export default MainChatSection
