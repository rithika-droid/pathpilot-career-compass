
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, Search, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Notifications from './Notifications/Notifications';
import UserProfile from './UserProfile/UserProfile';

interface NavbarProps {
  onShowAuth?: (show: boolean, mode: 'login' | 'signup') => void;
  toggleSidebar?: () => void;
}

const Navbar = ({ onShowAuth, toggleSidebar }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="md:hidden h-9 w-9"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PathPilot
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-secondary/50 rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search careers..." 
              className="bg-transparent border-none outline-none text-sm w-28 sm:w-auto"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'galaxy' ? 'mountain' : 'galaxy')}
            className="h-9 w-9"
          >
            {theme === 'galaxy' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <>
              <Notifications />
              <UserProfile />
              <Button variant="outline" onClick={logout} className="hidden sm:flex">
                Logout
              </Button>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onShowAuth && onShowAuth(true, 'login')}>
                Login
              </Button>
              <Button onClick={() => onShowAuth && onShowAuth(true, 'signup')} className="hidden sm:flex">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
