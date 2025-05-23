
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  UserCircle, 
  LayoutDashboard, 
  Route, 
  GraduationCap, 
  Award, 
  Trophy, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Profile Setup', path: '/profile-setup', icon: <UserCircle className="h-5 w-5" /> },
    { name: 'Roadmap', path: '/roadmap', icon: <Route className="h-5 w-5" /> },
    { name: 'Courses', path: '/courses', icon: <GraduationCap className="h-5 w-5" /> },
    { name: 'Certificates', path: '/certificates', icon: <Award className="h-5 w-5" /> },
    { name: 'Rewards', path: '/rewards', icon: <Trophy className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    { name: 'Help', path: '/help', icon: <HelpCircle className="h-5 w-5" /> }
  ];

  return (
    <aside 
      className={cn(
        "bg-card/95 backdrop-blur-md h-screen fixed left-0 top-0 z-30 border-r border-border flex flex-col transition-all duration-300 ease-in-out pt-16",
        isOpen ? "w-64" : "w-0 md:w-16 overflow-hidden"
      )}
    >
      <div className="flex justify-end p-2 absolute top-2 right-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="h-7 w-7 md:hidden"
        >
          <ChevronLeft className={cn("h-5 w-5", !isOpen && "rotate-180")} />
        </Button>
      </div>
      
      <div className="hidden md:flex justify-end p-2 absolute top-2 right-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="h-7 w-7"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center p-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10",
                  !isOpen && "justify-center"
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        {isOpen && (
          <div className="text-sm text-muted-foreground">
            <p>PathPilot v1.0</p>
            <p>© 2025 PathPilot</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
