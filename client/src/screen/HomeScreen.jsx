import React from 'react';
import NavBar from "../components/NavBar.jsx";
import MainChatSection from "../components/MainChatSection";
import ChatHistory from "../components/ChatHistory";
import { SidebarProvider, useSidebar } from "../context/SidebarContext.jsx";

function HomeScreenContent() {
  const { getSidebarWidth } = useSidebar();
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* NavBar - positioned to not interfere with layout */}
      <NavBar />

      {/* ChatHistory - fixed positioned, handles its own visibility */}
      <ChatHistory />
      
      {/* MainChatSection - takes remaining space, with responsive margin for sidebar */}
      <div 
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: getSidebarWidth() }}
      >
        <MainChatSection />
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <SidebarProvider>
      <HomeScreenContent />
    </SidebarProvider>
  );
}

export default HomeScreen;