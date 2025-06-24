import { useEffect, useState } from "react";
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

      <h1>list of messages are </h1>

      <ul >
        {messages.map((msg, index) => (
          <li className={msg.senderId==myId?"itsMeClass":(msg.senderId=="AssitantReplyGroq")?"assistantclass":"otherUserClass"}
            key={msg.id || index}
          >
            <strong>{msg.rool}:</strong> {msg.prompt}
          </li>
        ))}
      </ul>

      <h1>result</h1>


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
