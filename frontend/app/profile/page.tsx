'use client';

import React, { useState, useEffect } from 'react';
import { Configurations, CredentialProvider, CacheClient } from '@gomomento/sdk-web';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast} from "@/hooks/use-toast"; // Import the useToast hook

const ProfilePage = () => {
  const { toast } = useToast(); // ✅ Initialize the toast function
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    const client = new CacheClient({
      configuration: Configurations.Laptop.v1(),
      credentialProvider: CredentialProvider.fromString(process.env.NEXT_PUBLIC_MOMENTO_API_KEY!),
      defaultTtlSeconds: 600,
    });

    const getCacheData = async () => {
      setLoading(true);
      const getResponse = await client.get('job-portal-cache', 'user-profile');
      setLoading(false);

      if (getResponse.type === 'Hit') {
        const value = getResponse.value();
        setFormData(JSON.parse(value));
        toast({
          title: 'Profile found',
          description: 'Your profile data was loaded.',
        });
      } else {
        toast({
          title: 'No Profile found',
          description: 'You can fill in your details.',
        });
      }
    };

    getCacheData();
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const client = new CacheClient({
      configuration: Configurations.Laptop.v1(),
      credentialProvider: CredentialProvider.fromString(process.env.NEXT_PUBLIC_MOMENTO_API_KEY!),
      defaultTtlSeconds: 600,
    });

    const response = await client.set('job-portal-cache', 'user-profile', JSON.stringify(formData));
    setLoading(false);

    if (response.type === 'Success') {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
        duration: 5000,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={formData.name} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={formData.email} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="linkedin">Linkedin</Label>
        <Input id="linkedin" value={formData.linkedin} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={formData.location} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={formData.bio} onChange={handleChange} rows={4} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
};

export default ProfilePage;