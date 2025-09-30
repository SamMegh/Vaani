import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getSidebarWidth = () => {
    if (isMobile) return '0px';
    return collapsed ? '60px' : '15vw';
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        isMobile,
        isOpen,
        setIsOpen,
        getSidebarWidth,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};