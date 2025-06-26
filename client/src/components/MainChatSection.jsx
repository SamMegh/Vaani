import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";

const MainChatSection = () => {
  const { messages, addMessage, sendMessage, getMessage } = useChatStore();
  const { isAuthuser } = useAuthStore();
  const myId = isAuthuser.uid;
  const [msg, setMsg] = useState("");
  const handleSend = () => {
    if (msg.trim) {
      sendMessage(msg);
    }
  };
  useEffect(() => {
    getMessage();
  }, [getMessage])
  return (
    <div className='chat-main'>
      <div className="message-body">
        <h1 className="message-title">list of messages are </h1>
        {messages.map((msg, index) => (
          <li className={msg.senderId == myId ? "itsMeClass" : (msg.senderId == "AssitantReplyGroq") ? "assistantclass" : "otherUserClass"}
            key={msg.id || index}
          >
            <span className="msg-rol " >
              {msg.rool}
            </span>
            <span className="msg-prompt " >
              {msg.prompt}
            </span>
          </li>
        ))}
      </div>
      <div className="message-input">
        <textarea  type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder='Message...'/>
        {/* <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder='Message...'
        /> */}

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default MainChatSection
