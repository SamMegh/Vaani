import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.jsx";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSlidersH,
  faMicrophone,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";

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

  const messageBodyRef = useRef(null);

  useEffect(() => {
    if (messageBodyRef.current) {
      messageBodyRef.current.scrollTop = messageBodyRef.current.scrollHeight;
    }
  }, [messages]); // this will run whenever messages change
  return (
    <div className='chat-main'>
      <div className="message-body " ref={messageBodyRef}>
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


        <div className="chat-input-wrapper wrapper">
          <FontAwesomeIcon icon={faPlus} className="fas fa-plus styles-icon" />
          <input type="text" placeholder="Ask anything" value={msg}
            onChange={(e) => setMsg(e.target.value)} className="styles-input" />
          <FontAwesomeIcon icon={faWaveSquare} className="fas fa-wave-square styles-icon" onClick={handleSend} />
        </div>


      </div>







    </div>
  )
}

export default MainChatSection
