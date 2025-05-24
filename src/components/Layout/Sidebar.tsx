
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  UserCircle, 
  LayoutDashboard, 
  Route, 
  GraduationCap, 
  Award, 
  Trophy, 
  Settings, 
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Profile Setup', path: '/profile-setup', icon: <UserCircle className="h-5 w-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
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
        "fixed left-0 top-0 z-30 h-screen w-64 bg-card/95 backdrop-blur-md border-r border-border flex flex-col pt-16 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Close button for mobile */}
      <div className="flex justify-end p-4 md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="h-8 w-8"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => window.innerWidth < 768 && toggleSidebar()} // Close on mobile after click
                className={({ isActive }) => cn(
                  "flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-primary/10 group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-primary/10 hover:translate-x-1"
                )}
              >
                <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="ml-3 font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="font-semibold text-primary">PathPilot v1.0</p>
          <p>© 2025 PathPilot</p>
          <p className="text-xs">Your career companion</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
