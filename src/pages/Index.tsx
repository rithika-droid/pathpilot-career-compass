
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import Landing from './Landing';

const IndexLoadingSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-8 rounded-full mx-auto" />
      <Skeleton className="h-4 w-32 mx-auto" />
    </div>
  </div>
);

const Index = () => {
  const { user, userProfile, loading } = useAuth();

  // Show loading skeleton while checking authentication
  if (loading) {
    return <IndexLoadingSkeleton />;
  }

  // If authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, show landing page
  return <Landing />;
};

export default Index;
