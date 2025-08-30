import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import OnLoader from "../components/OnLoder.jsx";

const MainChatSection = () => {
  const { messages, sendMessage, getMessage, currentRoom, realTimeConvertiate, deleteRealTimeConvertiate, getMessageLoader } = useChatStore();
  const { isAuthuser } = useAuthStore();
  const myId = isAuthuser._id;

  const [msg, setMsg] = useState("");
  const messageBodyRef = useRef(null);
  const lastYRef = useRef(0);

  useEffect(() => {
    realTimeConvertiate();
    scrollToBottom();
    return () => deleteRealTimeConvertiate();
  }, [messages, deleteRealTimeConvertiate, realTimeConvertiate]);

  const scrollToBottom = () => {
    if (messageBodyRef.current) {
      messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
      lastYRef.current = messageBodyRef.current.scrollTop;
    }
  };

  const handleSend = () => {
    if (msg.trim()) {
      sendMessage(msg);
      setMsg("");
    }
  };


  if (getMessageLoader || !currentRoom) return <OnLoader />;

  return (
    <div className="chat-main">
      <div className="message-body" ref={messageBodyRef}>
        <h1 className="message-title">Chats</h1>
        {messages.map((msg, index) => (
          <li
            key={msg._id || index}
            className={
              msg.senderid === myId
                ? "itsMeClass"
                : msg.senderid === "PrivateAssistantGroq"
                ? "assistantclass"
                : "otherUserClass"
            }
          >
            <span className="msg-rol">{msg.senderid === myId ? "You" : msg.name}</span>
            <span className="msg-prompt">{msg.message}</span>
          </li>
        ))}
      </div>

      <div className="message-input">
        <div className="chat-input-wrapper wrapper">
          <FontAwesomeIcon icon={faPlus} className="fas fa-plus styles-icon" onClick={getMessage} />
          <textarea
            placeholder="Ask anything"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="styles-input"
            rows={2}
          />
          <FontAwesomeIcon icon={faWaveSquare} className="fas fa-wave-square styles-icon" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default MainChatSection;
