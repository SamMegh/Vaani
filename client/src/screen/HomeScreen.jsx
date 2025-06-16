import { useState } from "react";
import CustomInputBox from "../components/customInputBox";
import ListOfMessages from "../components/listOfMessages";
import CustomButton from "../components/customButton";
import { useChatStore } from "../store/useChatStore";
function HomeScreen() {
  const [msg, setMsg] = useState("");
  const {addMessage,sendMessage}=useChatStore();
  const handleSend = () => {
    if (msg.trim) {
      addMessage({ role: 'user', content: msg });
      sendMessage(msg);
    }
  };

  return (
    <div>
      <ListOfMessages />
      <h1>result</h1>
      <CustomInputBox input={msg} setInput={setMsg} />
      <CustomButton onClick={handleSend} />
    </div>
  );
}

export default HomeScreen;
