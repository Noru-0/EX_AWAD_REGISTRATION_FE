"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { authStorage } from '@/lib/auth-storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      const hasToken = !!authStorage.getAccessToken();
      
      if (!hasToken) {
        router.push(redirectTo);
        return;
      }
      
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router, redirectTo]);

  // Show loading while checking authentication
  if (isCheckingAuth || isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: "url('/beautiful-nature-landscape-forest-mountains-clouds.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative">
          <div className="bg-blue-900/50 backdrop-blur-md border border-white/30 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <h2 className="text-white text-2xl lg:text-3xl font-bold mb-2">Verifying access...</h2>
            <p className="text-white/80 mb-6 text-sm lg:text-base">Please wait while we verify your authentication.</p>
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span className="text-white/80 text-sm lg:text-base">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated after loading, redirect is handled by useEffect
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}