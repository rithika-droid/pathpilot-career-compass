
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircle, LayoutDashboard, Route, GraduationCap, Award, Trophy, Settings, HelpCircle, X, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar
}) => {
  const navItems = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  }, {
    name: 'Profile Setup',
    path: '/profile-setup',
    icon: <UserCircle className="h-5 w-5" />
  }, {
    name: 'Roadmap',
    path: '/roadmap',
    icon: <Route className="h-5 w-5" />
  }, {
    name: 'Courses',
    path: '/courses',
    icon: <GraduationCap className="h-5 w-5" />
  }, {
    name: 'Certificates',
    path: '/certificates',
    icon: <Award className="h-5 w-5" />
  }, {
    name: 'Rewards',
    path: '/rewards',
    icon: <Trophy className="h-5 w-5" />
  }, {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }, {
    name: 'Help',
    path: '/help',
    icon: <HelpCircle className="h-5 w-5" />
  }];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "bg-card/95 backdrop-blur-md h-screen fixed left-0 top-0 z-50 border-r border-border flex flex-col transition-all duration-300 ease-out transform",
        isOpen 
          ? "translate-x-0 w-64" 
          : "-translate-x-full w-64 md:translate-x-0 md:w-0 md:overflow-hidden"
      )}>
        {/* Close button for mobile */}
        <div className="flex justify-end p-4 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8 hover:bg-secondary/80"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <ul className="space-y-1">
            {navItems.map(item => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => cn(
                    "flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-secondary/80",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-primary/10 hover:translate-x-1"
                  )}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="ml-3 font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border/50 space-y-3">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-center">PathPilot v1.0</p>
            <p className="text-xs text-center mt-1">© 2025 PathPilot</p>
          </div>
          
          <div className="text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3">
            <p className="font-medium text-center mb-2">Created by</p>
            <p className="font-semibold text-primary text-center">Rithika Nemmaluri</p>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 justify-center">
                <Phone className="h-3 w-3" />
                <span className="text-xs">+91 8522943214</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Mail className="h-3 w-3" />
                <span className="text-xs">nemmaluririthika080606@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
