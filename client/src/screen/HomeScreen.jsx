import React from 'react';
import { SidebarProvider, useSidebar } from "../context/SidebarContext.jsx";

function HomeScreenContent() {
  const { getSidebarWidth } = useSidebar();
  
  return (
    <div className="flex h-screen w-full overflow-hidden">

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