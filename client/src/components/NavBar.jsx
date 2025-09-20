import { ClipboardCopy, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const NavBar = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [showEffect, setShowEffect] = useState(false);
  const { signout, isAuthuser } = useAuthStore();

  // Show dialog with effect and auto-close
  const openDialog = () => {
    setDialogOpen(true);
    setTimeout(() => setShowEffect(true), 10); // trigger effect
    setTimeout(() => {
      setShowEffect(false);
      setDialogOpen(false);
    }, 250000); // auto-close after 2.5s
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title" style={{ position: "relative" }}>
          <img
            className="navbar-logo"
            src="../src/assets/images2/dragon_7.jpg"
            alt="Site Logo"
            onClick={openDialog}
          />
          {dialogOpen && (
            <div
              className={`dialog${showEffect ? " dialog-fade-in" : ""}`}
              style={{
                position: "absolute",
                top: "100%",
                width: "max-content",
                left: 0,
                zIndex: 100,
                transition: "opacity 0.4s",
                opacity: showEffect ? 1 : 0,
              }}
            >
              <div className="dialog-content">
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
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "12px",
                    padding: "3px",
                    borderRadius: "4px",
                  }}
                  onClick={signout}
                >
                  <center>
                    LogOut <LogOut />
                  </center>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
