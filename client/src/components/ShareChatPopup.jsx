import React, { useState, useRef } from "react";

const ShareChatPopup = ({ url, onClose }) => {
  const [manualMode, setManualMode] = useState(false);
  const [uid, setUid] = useState("");
  const [shared, setShared] = useState(false);

  const handleAddUser = () => {
    
    setShared(true);
    setTimeout(() => {
      setShared(false);
      onClose();
    }, 1200);
  };

  // Drag logic
  const popupRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDragging(true);
    document.body.style.userSelect = "none";
    const rect = popupRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };
  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  React.useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

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
        ref={popupRef}
        style={{
          background: "rgba(255,255,255,0.18)",
          borderRadius: "18px",
          padding: "32px 24px",
          minWidth: "320px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          textAlign: "center",
          position: "absolute",
          left: position.x || `calc(50% - 160px)`,
          top: position.y || `calc(50% - 120px)`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.28)",
          color: "#222"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "32px",
            cursor: "move",
            position: "absolute",
            top: 0,
            left: 0,
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
            zIndex: 1
          }}
          onMouseDown={handleMouseDown}
        ></div>
        <button style={{ position: "absolute", top: 8, right: 12, border: "none", background: "none", fontSize: 18, cursor: "pointer" }} onClick={onClose}>×</button>
        {!manualMode ? (
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
        ) : (
          <>
            <h3>Enter UID to Share</h3>
            <input type="text" value={uid} onChange={e => setUid(e.target.value)} placeholder="Enter UID" style={{ width: "90%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "16px" }} />
            <br />
            <button style={{ padding: "10px 18px", borderRadius: "6px", background: "#222", color: "#fff", border: "none", cursor: "pointer" }} onClick={handleAddUser}>
              Add User
            </button>
            {shared && <div style={{ marginTop: "16px", color: "green" }}>Shared!</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default ShareChatPopup;
