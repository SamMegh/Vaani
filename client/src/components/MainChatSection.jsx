import { useState } from "react";
import CustomInputBox from "./customInputBox";
import ListOfMessages from "./listOfMessages";
import CustomButton from "./customButton";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";

const MainChatSection = () => {
  const { messages,addMessage, sendMessage,getMessage } = useChatStore();
  const {isAuthuser}=useAuthStore();
  const myId=isAuthuser.uid;
  const [msg, setMsg] = useState("");
  const handleSend = () => {
    // if (msg.trim) {
    //   addMessage({ role: 'user', content: msg });
    //   sendMessage(msg);
    // }
  };
  useEffect(()=>{
getMessage();
  },[])
  return (
    <div className='chat-main'>
      <div className="massege-body">
      <h1 className="chat-title">list of messages are </h1>

      <ul>
        {messages.map((msg, index) => (
          <li
            key={msg.id || index}
          >
            <strong>{msg.role}:</strong> {msg.content}
          </li>
        ))}
      </ul>



      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder='Message...'
      />

      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default MainChatSection
