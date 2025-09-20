
import NavBar from "../components/NavBar.jsx";
import MainChatSection from "../components/MainChatSection";
import ChatHistory from "../components/ChatHistory";
function HomeScreen() {
 

  return (
    <div className="main-div" style={{ display: "flex", height: "100vh" }}>
      <NavBar/>
      <MainChatSection/>
      <ChatHistory/>
    </div>
  );
}

export default HomeScreen;
