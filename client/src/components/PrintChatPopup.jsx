import React, { useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const PrintChatPopup = ({ onClose }) => {
  const { messages, currentRoom } = useChatStore();
  const { isAuthuser } = useAuthStore();
  const printRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    // Get current messages and user info for the print version
    const printMessages = messages.map((msg, index) => {
      const isUser = msg.senderid === isAuthuser._id;
      const isAssistant = msg.senderid === "PrivateAssistantGroq";
      
      if (isUser) {
        return `
          <div style="display: flex; justify-content: right; flex-direction: row-reverse; width: auto; position: relative; right: 0; padding: 15px 10px; margin: 15px 10px; font-family: Verdana, sans-serif;">
            <span style="padding: 5px 10px 5px 10px; margin: 0 5px 0 5px; width: fit-content; text-transform: uppercase; height: fit-content; background-color: #000000; color: white; border-radius: 4px; user-select: none; box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff;">You</span>
            <span style="font-size: 1.1rem; font-weight: 100; font-family: sans-serif; text-align: left; padding: 10px; margin: 0 5px 0 5px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word; background-color: #ffffff; border-radius: 5px; box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff; max-width: 100%; overflow-wrap: break-word; color: #000000;">${msg.message}</span>
          </div>
        `;
      } else if (isAssistant) {
        return `
          <div style="display: flex; position: relative; justify-content: center; flex-direction: column; margin: 15px auto; width: 50%; padding: 15px 10px; border-radius: 10px;">
            <span style="padding: 5px 10px 5px 10px; margin: 0 5px 0 5px; width: fit-content; text-transform: uppercase; height: fit-content; background-color: #000000; color: white; border-radius: 4px; user-select: none; box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff; align-self: center;">${msg.name}</span>
            <span style="font-size: 1.1rem; font-weight: 100; font-family: sans-serif; text-align: left; padding: 10px; margin: 0 5px 0 5px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word; background-color: #ffffff; border-radius: 5px; box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff; max-width: 100%; overflow-wrap: break-word; color: #000000;">${msg.message}</span>
          </div>
        `;
      } else {
        return `
          <div style="display: flex; justify-content: left; width: auto; position: relative; left: 0; padding: 15px 10px; margin: 15px 10px; font-family: Verdana, sans-serif;">
            <span style="padding: 5px 10px 5px 10px; margin: 0 5px 0 5px; width: fit-content; text-transform: uppercase; height: fit-content; background-color: #000000; color: white; border-radius: 4px; user-select: none; box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff;">${msg.name}</span>
            <span style="font-size: 1.1rem; font-weight: 100; font-family: sans-serif; text-align: left; padding: 10px; margin: 0 5px 0 5px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word; background-color: #ffffff; border-radius: 5px; box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff; max-width: 100%; overflow-wrap: break-word; color: #000000;">${msg.message}</span>
          </div>
        `;
      }
    }).join('');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chat Conversation - ${currentRoom?.name || 'Untitled Chat'}</title>
          <style>
            @font-face {
              font-family: 'AlphaWood';
              src: url('data:font/truetype;charset=utf-8;base64,') format('truetype');
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: Verdana, sans-serif;
              background: rgba(0, 0, 0, 0.904);
              padding: 20px;
              color: #333;
              line-height: 1.6;
            }
            
            .print-container {
              max-width: 80vw;
              margin: 0 auto;
              background-color: #30303088;
              backdrop-filter: blur(4px);
              border-radius: 20px;
              overflow: hidden;
            }
            
            .print-header {
              height: 10vh;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 3px 3px 3px #a3b1c6, -3px -3px 3px #fff0f0;
              backdrop-filter: blur(8px);
              margin: 0 0 0.5rem 0;
              position: sticky;
              top: 0;
              z-index: 10;
              font-family: 'AlphaWood', sans-serif;
              font-size: 2rem;
              color: white;
              mix-blend-mode: difference;
              text-transform: uppercase;
            }
            
            .print-body {
              position: relative;
              border-radius: 10px;
              width: 100%;
              padding: 20px;
              overflow-y: auto;
              overflow-x: hidden;
              scrollbar-width: none;
            }
            
            .print-footer {
              background-color: #000000;
              color: white;
              padding: 15px;
              text-align: center;
              font-size: 0.8rem;
              font-family: Verdana, sans-serif;
              text-transform: uppercase;
              box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff;
              margin: 10px;
              border-radius: 4px;
            }
            
            .stats {
              display: flex;
              justify-content: center;
              gap: 20px;
              flex-wrap: wrap;
              margin-top: 10px;
            }
            
            .stat-item {
              background-color: #ffffff;
              color: #000000;
              padding: 8px 12px;
              border-radius: 5px;
              box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff;
              text-align: center;
              margin: 5px;
            }
            
            .stat-number {
              font-size: 1.2rem;
              font-weight: bold;
              margin: 0;
            }
            
            .stat-label {
              font-size: 0.7rem;
              text-transform: uppercase;
              margin-top: 2px;
            }
            
            @media print {
              body {
                background: white !important;
                padding: 0 !important;
              }
              
              .print-container {
                background: white !important;
                backdrop-filter: none !important;
                border-radius: 0 !important;
                max-width: none !important;
              }
              
              .print-header {
                background: #000000 !important;
                color: white !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                mix-blend-mode: normal !important;
                box-shadow: 3px 3px 3px #77ff00, -5px -5px 5px #00e1ff !important;
              }
              
              span[style*="box-shadow"] {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              .stat-item {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              .print-footer {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="print-header">
              <h1>Chats</h1>
            </div>
            
            <div class="print-body">
              ${printMessages}
            </div>
            
            <div class="print-footer">
              <p style="margin: 0 0 10px 0;">Generated from Chat Application</p>
              <div class="stats">
                <div class="stat-item">
                  <div class="stat-number">${stats.total}</div>
                  <div class="stat-label">Total Messages</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${stats.user}</div>
                  <div class="stat-label">Your Messages</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${stats.assistant}</div>
                  <div class="stat-label">AI Responses</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Small delay to ensure content is loaded before printing
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 100);
  };

  const getMessageStats = () => {
    const userMessages = messages.filter(msg => msg.senderid === isAuthuser._id);
    const assistantMessages = messages.filter(msg => msg.senderid === "PrivateAssistantGroq");
    const otherMessages = messages.filter(msg => msg.senderid !== isAuthuser._id && msg.senderid !== "PrivateAssistantGroq");
    
    return {
      total: messages.length,
      user: userMessages.length,
      assistant: assistantMessages.length,
      others: otherMessages.length
    };
  };

  const stats = getMessageStats();

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(5px)"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        width: "90%",
        maxWidth: "900px",
        maxHeight: "90vh",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>Print Conversation</h2>
            <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "0.9rem" }}>
              {currentRoom?.name || 'Untitled Chat'} • {stats.total} messages
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ×
          </button>
        </div>

        {/* Preview Area */}
        <div style={{
          flex: 1,
          overflow: "auto",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.904)"
        }}>
          <div ref={printRef} style={{
            backgroundColor: "#30303088",
            backdropFilter: "blur(4px)",
            borderRadius: "20px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "3px 3px 3px #a3b1c6, -3px -3px 3px #fff0f0",
              backdropFilter: "blur(8px)",
              margin: "0 0 0.5rem 0",
              position: "sticky",
              top: 0,
              zIndex: 10,
              fontFamily: "'AlphaWood', sans-serif",
              fontSize: "2rem",
              color: "white",
              mixBlendMode: "difference",
              textTransform: "uppercase"
            }}>
              <h1 style={{ margin: 0 }}>Chats</h1>
            </div>
            
            <div style={{ padding: "30px" }}>
              {messages.map((msg, index) => {
                const isUser = msg.senderid === isAuthuser._id;
                const isAssistant = msg.senderid === "PrivateAssistantGroq";
                
                if (isUser) {
                  return (
                    <div 
                      key={msg._id || index} 
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        flexDirection: "row-reverse",
                        width: "auto",
                        position: "relative",
                        right: 0,
                        padding: "15px 10px",
                        margin: "15px 10px",
                        fontFamily: "Verdana, sans-serif"
                      }}
                    >
                      <span style={{
                        padding: "5px 10px 5px 10px",
                        margin: "0 5px 0 5px",
                        width: "fit-content",
                        textTransform: "uppercase",
                        height: "fit-content",
                        backgroundColor: "#000000",
                        color: "white",
                        borderRadius: "4px",
                        userSelect: "none",
                        boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff"
                      }}>You</span>
                      <span style={{
                        fontSize: "1.1rem",
                        fontWeight: "100",
                        fontFamily: "sans-serif",
                        textAlign: "left",
                        padding: "10px",
                        margin: "0 5px 0 5px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                        boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                        maxWidth: "100%",
                        overflowWrap: "break-word"
                      }}>{msg.message}</span>
                    </div>
                  );
                } else if (isAssistant) {
                  return (
                    <div 
                      key={msg._id || index} 
                      style={{
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        flexDirection: "column",
                        margin: "15px auto",
                        width: "50%",
                        padding: "15px 10px",
                        borderRadius: "10px"
                      }}
                    >
                      <span style={{
                        padding: "5px 10px 5px 10px",
                        margin: "0 5px 0 5px",
                        width: "fit-content",
                        textTransform: "uppercase",
                        height: "fit-content",
                        backgroundColor: "#000000",
                        color: "white",
                        borderRadius: "4px",
                        userSelect: "none",
                        boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                        alignSelf: "center"
                      }}>{msg.name}</span>
                      <span style={{
                        fontSize: "1.1rem",
                        fontWeight: "100",
                        fontFamily: "sans-serif",
                        textAlign: "left",
                        padding: "10px",
                        margin: "0 5px 0 5px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                        boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                        maxWidth: "100%",
                        overflowWrap: "break-word"
                      }}>{msg.message}</span>
                    </div>
                  );
                } else {
                  return (
                    <div 
                      key={msg._id || index} 
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        width: "auto",
                        position: "relative",
                        left: 0,
                        padding: "15px 10px",
                        margin: "15px 10px",
                        fontFamily: "Verdana, sans-serif"
                      }}
                    >
                      <span style={{
                        padding: "5px 10px 5px 10px",
                        margin: "0 5px 0 5px",
                        width: "fit-content",
                        textTransform: "uppercase",
                        height: "fit-content",
                        backgroundColor: "#000000",
                        color: "white",
                        borderRadius: "4px",
                        userSelect: "none",
                        boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff"
                      }}>{msg.name}</span>
                      <span style={{
                        fontSize: "1.1rem",
                        fontWeight: "100",
                        fontFamily: "sans-serif",
                        textAlign: "left",
                        padding: "10px",
                        margin: "0 5px 0 5px",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                        boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                        maxWidth: "100%",
                        overflowWrap: "break-word"
                      }}>{msg.message}</span>
                    </div>
                  );
                }
              })}
            </div>
            
            <div style={{
              backgroundColor: "#000000",
              color: "white",
              padding: "15px",
              textAlign: "center",
              fontSize: "0.8rem",
              fontFamily: "Verdana, sans-serif",
              textTransform: "uppercase",
              boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
              margin: "10px",
              borderRadius: "4px"
            }}>
              <p style={{ margin: "0 0 10px 0" }}>Generated from Chat Application</p>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap"
              }}>
                <div style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                  textAlign: "center",
                  margin: "5px"
                }}>
                  <div style={{ 
                    fontSize: "1.2rem", 
                    fontWeight: "bold", 
                    margin: "0"
                  }}>{stats.total}</div>
                  <div style={{ 
                    fontSize: "0.7rem", 
                    textTransform: "uppercase", 
                    marginTop: "2px"
                  }}>Total Messages</div>
                </div>
                <div style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                  textAlign: "center",
                  margin: "5px"
                }}>
                  <div style={{ 
                    fontSize: "1.2rem", 
                    fontWeight: "bold", 
                    margin: "0"
                  }}>{stats.user}</div>
                  <div style={{ 
                    fontSize: "0.7rem", 
                    textTransform: "uppercase", 
                    marginTop: "2px"
                  }}>Your Messages</div>
                </div>
                <div style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  boxShadow: "3px 3px 3px #77ff00, -5px -5px 5px #00e1ff",
                  textAlign: "center",
                  margin: "5px"
                }}>
                  <div style={{ 
                    fontSize: "1.2rem", 
                    fontWeight: "bold", 
                    margin: "0"
                  }}>{stats.assistant}</div>
                  <div style={{ 
                    fontSize: "0.7rem", 
                    textTransform: "uppercase", 
                    marginTop: "2px"
                  }}>AI Responses</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          padding: "20px 30px",
          borderTop: "1px solid #e9ecef",
          display: "flex",
          gap: "15px",
          justifyContent: "flex-end"
        }}>
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "white",
              color: "#374151",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
            }}
          >
            🖨️ Print Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintChatPopup;