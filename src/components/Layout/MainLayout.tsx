
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed to false by default
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Backdrop overlay for mobile */}
      {user && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - only shown when logged in */}
      {user && (
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
      )}
      
      <div className={`flex flex-col flex-grow w-full transition-all duration-300 ease-in-out ${
        user && sidebarOpen ? 'md:ml-64' : 'ml-0'
      }`}>
        {/* Navbar */}
        <Navbar 
          onShowAuth={onShowAuth} 
          toggleSidebar={toggleSidebar}
          showMenuButton={!!user}
        />
        
        {/* Main content */}
        <main className="flex-grow w-full pt-16">
          {children}
        </main>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
};

export default MainLayout;
