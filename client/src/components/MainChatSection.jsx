import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWaveSquare, faShareSquare, faPrint } from "@fortawesome/free-solid-svg-icons";
import ShareChatPopup from "./ShareChatPopup";
import OnLoader from "../components/OnLoder.jsx";

const MainChatSection = () => {
  const { messages, sendMessage, currentRoom, realTimeConvertiate, deleteRealTimeConvertiate, getMessageLoader } = useChatStore();
  const { isAuthuser } = useAuthStore();
  const myId = isAuthuser._id;

  const [msg, setMsg] = useState("");
  const [showSharePrint, setShowSharePrint] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
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
        <div className="chat-input-wrapper wrapper" style={{ position: "relative" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <FontAwesomeIcon
              icon={faPlus}
              className="fas fa-plus styles-icon"
              onClick={() => setShowSharePrint((prev) => !prev)}
            />
            {showSharePrint && (
              <div style={{
                position: "absolute",
                bottom: "110%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                background: "#222",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                display: "grid",
                gridTemplateRows: "repeat(2, 1fr)",
                gridTemplateColumns: "1fr",
                gap: "12px",
                alignItems: "center",
                justifyItems: "center"
              }}>
                <span>
                  <FontAwesomeIcon
                    icon={faShareSquare}
                    style={{ cursor: "pointer", fontSize: "22px" }}
                    title="Share chat"
                    onClick={() => {
                      setShowSharePopup(true);
                      setShowSharePrint(false);
                    }}
                  />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faPrint}
                    style={{ cursor: "pointer", fontSize: "22px" }}
                    title="Print chat"
                    onClick={() => {
                      setShowSharePrint(false);
                      alert("To be updated soon");
                    }}
                  />
                </span>
              </div>
            )}
      {showSharePopup && (
        <ShareChatPopup url={window.location.href + "?chatId=" + (currentRoom?._id || "")}
          onClose={() => setShowSharePopup(false)} />
      )}
          </div>
          <textarea
            placeholder="Ask anything"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="styles-input"
            minLength={1}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <FontAwesomeIcon icon={faWaveSquare} className="fas fa-wave-square styles-icon" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default MainChatSection;
