import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import OnLoader from "../components/OnLoder.jsx";

const MainChatSection = () => {
  const { messages, sendMessage, getMessage, realTimeConvertiate, deleteRealTimeConvertiate, getMessageLoader } = useChatStore();
  const { isAuthuser } = useAuthStore();
  const myId = isAuthuser._id;

  const [msg, setMsg] = useState("");
  const messageBodyRef = useRef(null);

  // Momentum scroll state
  const velocityRef = useRef(0);
  const rafRef = useRef(null);
  const lastYRef = useRef(0);
  const isDraggingRef = useRef(false);

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

  // Momentum scroll effect
  useEffect(() => {
    const el = messageBodyRef.current;
    if (!el) return;

    const onScroll = () => {
      const currentY = el.scrollTop;
      velocityRef.current = currentY - lastYRef.current;
      lastYRef.current = currentY;
    };

    const handlePointerDown = () => {
      isDraggingRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      startMomentumScroll();
    };

    const startMomentumScroll = () => {
      const decay = 0.95; // friction factor
      const step = () => {
        if (!el || isDraggingRef.current) return;
        velocityRef.current *= decay;
        el.scrollTop += velocityRef.current;
        if (Math.abs(velocityRef.current) > 0.5) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    // Mouse + touch support
    el.addEventListener("scroll", onScroll);
    el.addEventListener("mousedown", handlePointerDown);
    el.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mousedown", handlePointerDown);
      el.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (getMessageLoader) return <OnLoader />;

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
