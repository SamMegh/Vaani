import React from 'react';
import { SidebarProvider, useSidebar } from "../context/SidebarContext.jsx";
import Navbar from '../components/navbar.component.jsx';

function HomeScreenContent() {
  const { getSidebarWidth } = useSidebar();
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* NavBar - positioned to not interfere with layout */}
      <Navbar />

      {/* ChatHistory - fixed positioned, handles its own visibility */}
      {/* <ChatHistory /> */}
      
      {/* MainChatSection - takes remaining space, with responsive margin for sidebar */}
      <div 
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: getSidebarWidth() }}
      >
        {/* <MainChatSection /> */}
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