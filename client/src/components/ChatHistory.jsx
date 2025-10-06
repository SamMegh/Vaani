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
    createMsgCollection,
  } = useChatStore();

  const [isOpen, setIsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    getMessageCollection();
  }, [getMessageCollection]);

  return (
    <div className="relative">
      {/* Mobile toggle (floating) */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="sm:hidden fixed right-4 top-4 z-40 bg-white text-black p-2 rounded-lg shadow-lg"
        aria-label="Open chats"
      >
        <FiMenu size={18} />
      </button>

  <motion.aside
        initial={{ x: "110%" }}
        animate={{ x: isOpen ? 0 : "110%" }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        layout
        className={`fixed right-4 top-16 bottom-6 z-30 rounded-2xl bg-gradient-to-br from-white/6 to-white/4 border border-white/10 backdrop-blur-sm p-3 flex flex-col gap-3 shadow-xl ${
          collapsed ? "w-20 sm:w-20" : "w-72 sm:w-80"
        } transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            {!collapsed && (
              <div className={`${collapsed ? "w-8 h-8" : "w-9 h-9"} rounded-full bg-white/8 flex items-center justify-center text-white font-semibold`}>V</div>
            )}
            {!collapsed && (
              <div>
                <div className="text-sm text-white font-semibold">Chats</div>
                <div className="text-xs text-white/70">Recent conversations</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed((c) => !c)}
                className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20"
              title={collapsed ? "Expand" : "Collapse"}
            >
              <FiMenu />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="mb-3 px-1">
            {!collapsed ? (
              <button
                onClick={createMsgCollection}
                className="w-full py-2 rounded-lg bg-white text-black font-semibold shadow-md"
              >
                New chat
              </button>
            ) : (
              <button
                onClick={createMsgCollection}
                className="w-full p-2 rounded-lg bg-white text-black font-semibold shadow-md flex items-center justify-center"
                title="New chat"
              >
                <FiMessageSquare />
              </button>
            )}
          </div>

          <div className={`space-y-2 px-1 ${collapsed ? "flex flex-col items-center" : ""}`}>
            {chatRooms.map((item, idx) => (
              <button
                key={item._id || idx}
                onClick={() => {
                  setCurrentRoom(item._id);
                  setActive(item);
                  getMessage();
                }}
                className={`w-full ${collapsed ? "flex flex-col items-center p-2" : "flex items-center gap-3 text-left p-2"} bg-white/6  rounded-lg hover:bg-white/20 transition ${
                  active === item ? "bg-white/50" : ""
                }`}
                title={collapsed ? item.name : undefined}
              >
                <div className={`${collapsed ? "w-8 h-8" : "w-10 h-10"} rounded-md flex items-center justify-center text-white font-semibold`}>{(item.name||"").charAt(0).toUpperCase()}</div>
                {!collapsed && (
                  <div className={`flex-1 min-w-0 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-200`}> 
                    <div className="text-sm text-white font-medium truncate">{item.name}</div>
                    <div className="text-xs text-white/70 truncate">{item.lastMessage?.slice(0, 40) || "Start a conversation"}</div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 px-1">
          <a href="#" className="text-xs text-white/70 underline">Upgrade plan</a>
        </div>
      </motion.aside>
    </div>
  );
};

export default ChatHistory;
