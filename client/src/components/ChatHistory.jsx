import React, { useState } from 'react';
import { FiMenu, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';

const chatItems = [
  "Popover Component Enhance...",
  "Chat Input UI Design",
  "Weekly AI Content Plan",
  "AI Social Media Plan",
  "CSS Chat Interface Fixes",
  "Git pull conflict fix",
  "Social Media Strategy Script",
  ".zshrc path error fix",
  "Resume Feedback and Impro...",
  "Check Display Driver",
  "WordPress e-commerce setup"
];

const ChatHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(chatItems[0]);

  return (
    <div className="container">
      <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu size={22} />
      </div>

      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      >
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-collapse-btn">
          <FiMenu />
        </button>

        {!collapsed && <h2>Chats</h2>}

        <div className="chat-list">
          {chatItems.map((item, idx) => (
            <button
              key={idx}
              className={`chat-button ${active === item ? 'active' : ''}`}
              onClick={() => setActive(item)}
              style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
              title={collapsed ? item : undefined}
            >
              <FiMessageSquare className="icon" />
              {!collapsed && (
                item.split(" ").slice(0, 2).join(" ") + (item.split(" ").length > 3 ? "..." : "")
              )}
            </button>
          ))}
        </div>

        {!collapsed && (
          <div className="footer">
            <a href="#" className="footer-link">Upgrade plan</a>
          </div>
        )}
      </motion.aside>

    </div>
  )
}

export default ChatHistory
