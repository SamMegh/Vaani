import { ClipboardCopy, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useRef, useEffect } from "react";

const NavBar = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [showEffect, setShowEffect] = useState(false);
  const { signout, isAuthuser } = useAuthStore();
  const dialogRef = useRef(null);

  // Show dialog with effect
  const openDialog = () => {
    setDialogOpen(true);
    setTimeout(() => setShowEffect(true), 10); // trigger effect
  };

  // Click outside handler
  useEffect(() => {
    if (!dialogOpen) return;
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowEffect(false);
        setDialogOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dialogOpen]);
  return (
    <div>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 9999,
          padding: '8px 12px',
          borderRadius: 20,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
          boxShadow: '0 6px 20px rgba(2,6,23,0.5)',
          border: '1px solid rgba(255,255,255,0.04)'
        }}
      >
  <div className="navbar-title" style={{ position: "relative", display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 4 }}>
          <img
            className="navbar-logo h-[100px]"
            src="./model.png"
            alt="Site Logo"
            onClick={openDialog}
            style={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: 14,
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          />
          {dialogOpen && (
            <div
              ref={dialogRef}
              className={`dialog${showEffect ? " dialog-fade-in" : ""}`}
              style={{
                position: "absolute",
                top: "100%",
                width: "max-content",
                left: 0,
                zIndex: 100,
                transition: "opacity 0.4s",
                opacity: showEffect ? 1 : 0,
                background: "rgba(255,255,255,0.18)",
                borderRadius: "18px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              <div className="dialog-content" style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: "18px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.28)",
                padding: "24px 32px"
              }}>
                <button
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                    border: "none",
                    background: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowEffect(false);
                    setDialogOpen(false);
                  }}
                >
                  x
                </button>
                <h2 style={{ margin: 5 }}>Name : {isAuthuser?.name}</h2>
                <p style={{ fontSize: "12px" }}>
                  UID :
                  <span
                    style={{ fontSize: "10px", fontWeight: "light" }}
                    id="user-uid"
                  >
                    {isAuthuser?._id}
                  </span>
                  <span
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => {
                      if (isAuthuser?._id) {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(isAuthuser._id);
                          setShowEffect(false);
                          setDialogOpen(false);
                        }
                        else {
                          const tempInput = document.createElement("input");
                          tempInput.value = isAuthuser._id;
                          document.body.appendChild(tempInput);
                          tempInput.select();
                          document.execCommand("copy");
                          document.body.removeChild(tempInput);
                        }
                        alert("UID copied!");
                      }
                    }}
                  >
                    <ClipboardCopy size={15} />
                  </span>
                </p>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.18)",
                    color: "#d32f2f",
                    fontWeight: "bold",
                    fontSize: "15px",
                    padding: "5px 24px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.28)",
                    boxShadow: "0 2px 8px rgba(31,38,135,0.18)",
                    cursor: "pointer",
                    transition: "background 0.3s, color 0.3s"
                  }}
                  onClick={signout}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "rgba(211,47,47,0.18)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.color = "#d32f2f";
                  }}
                >
                  LogOut&nbsp;<LogOut />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
