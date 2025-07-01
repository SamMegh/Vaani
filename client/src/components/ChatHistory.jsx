import React, { useEffect, useState } from "react";
import { FiMenu, FiMessageSquare } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useChatStore } from "../store/useChatStore";

const ChatHistory = () => {
  const {
    getMessageCollection,
    chatRooms,
    setCurrentRoom,
    getMessage,
  } = useChatStore();

  const [isOpen, setIsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [active, setActive] = useState(null);

  // Fetch chatRooms on mount
  useEffect(() => {
    getMessageCollection();
  }, [getMessageCollection]);

  // Auto-select and load first chat when chatRooms load
  useEffect(() => {
    if (!active && chatRooms.length > 0) {
      const firstChat = chatRooms[0];
      setActive(firstChat);
      setCurrentRoom(firstChat._id);
      getMessage();
    }
  }, [chatRooms, active, getMessage, setCurrentRoom]);

  return (
    <div className="container">
      <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu size={22} />
      </div>

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`sidebar ${collapsed ? "collapsed" : ""}`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="toggle-collapse-btn"
        >
          <FiMenu />
        </button>

        {!collapsed && <h2>Chats</h2>}

        <div className="chat-list">
          {chatRooms.map((item, idx) => (
            <button
              key={idx}
              className={`chat-button ${active === item ? "active" : ""}`}
              onClick={() => {
                setCurrentRoom(item._id);
                setActive(item);
                getMessage();
              }}
              style={{ justifyContent: collapsed ? "center" : "flex-start" }}
              title={collapsed ? item.name : undefined}
            >
              <FiMessageSquare className="icon" />
              {!collapsed && item.name}
            </button>
          ))}
        </div>

        {!collapsed && (
          <div className="footer">
            <a href="#" className="footer-link">
              Upgrade plan
            </a>
          </div>
        )}
      </motion.aside>
    </div>
  );
};

export default ChatHistory;
