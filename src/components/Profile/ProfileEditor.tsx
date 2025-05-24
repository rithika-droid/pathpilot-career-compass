
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../../hooks/useAuth';
import { Edit2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfileEditor = () => {
  const { user, profile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage for persistence
      const updatedProfile = { ...profile, username };
      localStorage.setItem('pathpilot_display_name', username);
      
      // Also update in the auth context
      await updateUserProfile({ username });
      
      setIsEditing(false);
      toast({
        title: "✅ Display name updated!",
        description: "Your name has been saved successfully.",
      });
    } catch (error) {
      // If Supabase fails, still save locally
      localStorage.setItem('pathpilot_display_name', username);
      setIsEditing(false);
      toast({
        title: "✅ Display name updated!",
        description: "Your name has been saved locally.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to saved value
    const savedName = localStorage.getItem('pathpilot_display_name') || 
                     profile?.username || 
                     user?.user_metadata?.full_name || 
                     user?.email?.split('@')[0] || '';
    setUsername(savedName);
    setIsEditing(false);
  };

  const displayName = localStorage.getItem('pathpilot_display_name') || 
                     profile?.username || 
                     user?.user_metadata?.full_name || 
                     user?.email?.split('@')[0] || 
                     'No name set';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Profile Information
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          Update your profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Display Name
          </label>
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  } else if (e.key === 'Escape') {
                    handleCancel();
                  }
                }}
              />
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading || !username.trim()}
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-secondary/50 rounded-md">
              {displayName}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
