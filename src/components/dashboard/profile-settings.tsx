'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth/AuthContext';

interface ProfileData {
  email: string;
  name?: string;
  notifications: boolean;
}

export function ProfileSettings() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    email: user?.email || '',
    name: user?.user_metadata?.name || '',
    notifications: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update profile logic would go here
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {message && (
        <Alert
          variant={message.type === 'success' ? 'default' : 'destructive'}
          className="mb-4"
        >
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={profileData.email}
            disabled={true}
            className="bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="notifications"
            checked={profileData.notifications}
            onChange={(e) => setProfileData({ ...profileData, notifications: e.target.checked })}
            disabled={!isEditing}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="text-sm text-gray-700">
            Receive email notifications about new recommendations
          </label>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
