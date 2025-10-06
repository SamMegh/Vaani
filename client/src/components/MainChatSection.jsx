import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWaveSquare, faShareSquare, faPrint } from "@fortawesome/free-solid-svg-icons";
import ShareChatPopup from "./ShareChatPopup";
import OnLoader from "../components/OnLoder.jsx";
import "./MainChatSection.css";

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
      <div className="chat-header">
        <div style={{display:'flex',flexDirection:'column'}}>
          <h2>{currentRoom?.name || 'Chats'}</h2>
          <div className="sub">{messages.length} messages • {currentRoom?._id || 'room'}</div>
        </div>
      </div>

      <div className="message-body" ref={messageBodyRef}>
        <ul className="messages-list">
          {messages.map((m, index) => {
            const isMe = m.senderid === myId;
            const cls = isMe ? 'you message-item' : 'other message-item';
            const initials = (m.name || (isMe? 'You' : 'U')).charAt(0).toUpperCase();
            return (
              <li key={m._id || index} className={cls}>
                <div className="avatar">{initials}</div>
                <div>
                  <div className="bubble">{m.message}</div>
                  <div className="meta">{isMe ? 'You' : m.name} • {new Date(m.createdAt || Date.now()).toLocaleTimeString()}</div>
                </div>
              </li>
            );
          })}
        </ul>
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
              <ShareChatPopup url={window.location.href + "?chatId=" + (currentRoom?._id || "")} onClose={() => setShowSharePopup(false)} />
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
