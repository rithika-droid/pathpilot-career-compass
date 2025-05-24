
import React, { useState } from 'react';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import Chatbot from '../Chatbot/Chatbot';
import { useAuth } from '../../hooks/useAuth';

interface MainLayoutProps {
  children: React.ReactNode;
  onShowAuth?: (show: boolean, mode: 'login' | 'signup') => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onShowAuth }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Sidebar - only shown when logged in */}
      {user && (
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
      )}
      
      <div className="flex flex-col flex-grow w-full">
        {/* Navbar with toggleSidebar prop */}
        <Navbar 
          onShowAuth={onShowAuth} 
          toggleSidebar={user ? toggleSidebar : undefined}
        />
        
        {/* Main content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
};

export default MainLayout;
