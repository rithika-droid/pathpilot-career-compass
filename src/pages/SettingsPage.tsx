
import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../components/ThemeProvider';
import { toast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    courseReminders: true,
    newFeatures: true,
    progressSummary: true
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated successfully",
      description: "Your profile information has been updated.",
    });
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password updated successfully",
      description: "Your password has been changed.",
    });
  };
  
  const handleNotificationsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-xl text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        name="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                      >
                        {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input 
                        id="newPassword" 
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                      >
                        {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
                      >
                        {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Control which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationsUpdate} className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailUpdates">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly summaries and important announcements</p>
                    </div>
                    <Switch
                      id="emailUpdates"
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) => handleToggleChange('emailUpdates', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="courseReminders">Course Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminders about your courses and deadlines</p>
                    </div>
                    <Switch
                      id="courseReminders"
                      checked={notifications.courseReminders}
                      onCheckedChange={(checked) => handleToggleChange('courseReminders', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="newFeatures">New Feature Announcements</Label>
                      <p className="text-sm text-muted-foreground">Learn about new courses and platform features</p>
                    </div>
                    <Switch
                      id="newFeatures"
                      checked={notifications.newFeatures}
                      onCheckedChange={(checked) => handleToggleChange('newFeatures', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="progressSummary">Progress Summary</Label>
                      <p className="text-sm text-muted-foreground">Receive monthly progress updates</p>
                    </div>
                    <Switch
                      id="progressSummary"
                      checked={notifications.progressSummary}
                      onCheckedChange={(checked) => handleToggleChange('progressSummary', checked)}
                    />
                  </div>
                  
                  <Button type="submit">Save Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Choose your preferred theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className={`rounded-lg p-4 border-2 transition-all cursor-pointer ${theme === 'galaxy' ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                    onClick={() => setTheme('galaxy')}
                  >
                    <div className="h-24 rounded bg-gradient-to-br from-[#121826] via-[#1a1f2e] to-[#121826] mb-2"></div>
                    <p className="font-medium">Galaxy (Dark)</p>
                    <p className="text-sm text-muted-foreground">Dark theme with cosmic accents</p>
                  </div>
                  
                  <div 
                    className={`rounded-lg p-4 border-2 transition-all cursor-pointer ${theme === 'mountain' ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                    onClick={() => setTheme('mountain')}
                  >
                    <div className="h-24 rounded bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] mb-2"></div>
                    <p className="font-medium">Mountain (Light)</p>
                    <p className="text-sm text-muted-foreground">Light theme with nature-inspired accents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Account Management */}
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>Manage your account data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export My Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete My Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
