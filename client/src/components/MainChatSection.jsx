import { useState } from "react";
import CustomInputBox from "./customInputBox";
import ListOfMessages from "./listOfMessages";
import CustomButton from "./customButton";
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

      <h1>list of messages are </h1>

      <ul>
        {messages.map((msg, index) => (
          <li
            key={msg.id || index}
          >
            <strong>{msg.role}:</strong> {msg.content}
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
