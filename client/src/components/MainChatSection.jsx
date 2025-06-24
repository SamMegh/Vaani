import { useState } from "react";
import { useChatStore } from "../store/useChatStore.jsx";

const MainChatSection = () => {
  const { messages } = useChatStore();

  const [msg, setMsg] = useState("");
  const { addMessage, sendMessage } = useChatStore();
  const handleSend = () => {
    if (msg.trim) {
      addMessage({ role: 'user', content: msg });
      sendMessage(msg);
    }
  };
  return (
    <div className='chat-main'>
      <div className="massege-body">
      <h1 className="chat-title">list of messages are </h1>

        <ul>
          {messages.map((msg, index) => (
            <div className={msg.role == "user" ? "userclass" : "assistanclass"}
              key={msg.id || index}
            >
              <strong>{msg.role}:</strong> {msg.content}

            </div>
          ))}
        </ul>
      </div>




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
