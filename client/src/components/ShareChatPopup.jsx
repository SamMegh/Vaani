import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const ShareChatPopup = ({ url, onClose }) => {
  const [manualMode, setManualMode] = useState(false);
  const [uid, setUid] = useState("");
  const [shared, setShared] = useState(false);
  const { shareChat } = useChatStore();

  const handleAddUser = () => {
    shareChat(uid);
    setShared(true);
    setTimeout(() => {
      setShared(false);
      onClose();
    }, 1200);
  };


  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.4)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div
        style={{
          background: "rgba(255,255,255,0.18)",
          borderRadius: "18px",
          padding: "32px 24px",
          minWidth: "320px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          textAlign: "center",
          position: "relative",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.28)",
          color: "#222"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.5)",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "bold",
            color: "#222",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
          aria-label="Close"
        >
          ×
        </button>
        {manualMode ? (
          <>
            <h3>Enter UID to Share</h3>
            <input type="text" value={uid} onChange={e => setUid(e.target.value)} placeholder="Enter UID" style={{ width: "90%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "16px" }} />
            <br />
            <button style={{ padding: "10px 18px", borderRadius: "6px", background: "#222", color: "#fff", border: "none", cursor: "pointer" }} onClick={handleAddUser}>
              Add User
            </button>
            {shared && <div style={{ marginTop: "16px", color: "green" }}>Shared!</div>}
          </>
        ) : (
          <>
            <h3>Share Chat</h3>
            <div style={{ margin: "18px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <input type="text" value={url} readOnly style={{ width: "70%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
              <button
                style={{ padding: "8px 12px", borderRadius: "6px", background: "#222", color: "#fff", border: "none", cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  alert("URL copied!");
                }}
              >
                Copy
              </button>
            </div>
            <div style={{ margin: "18px 0", fontWeight: "bold" }}>OR</div>
            <button style={{ padding: "10px 18px", borderRadius: "6px", background: "#222", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setManualMode(true)}>
              Manual Add
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShareChatPopup;
