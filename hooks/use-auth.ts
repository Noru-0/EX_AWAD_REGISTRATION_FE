import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import { authStorage } from '@/lib/auth-storage';
import { useRouter } from 'next/navigation';

// Login mutation
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return authApi.login(credentials);
    },
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // Redirect to dashboard
      router.push('/home');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return authApi.logout_api();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Redirect to login
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Still clear tokens and redirect even if API call fails
      authStorage.clearAllTokens();
      queryClient.clear();
      router.push('/login');
    },
  });
};

// Register mutation
export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: { email: string; password: string }) => {
      return authApi.register(userData);
    },
    onSuccess: (data) => {
      // Redirect to login page after successful registration
      router.push('/login');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

// User profile query
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await authApi.getProfile();
      return response.data;
    },
    enabled: !!authStorage.getAccessToken(), // Only run if access token exists
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors (unauthorized)
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Authentication status hook
export const useAuth = () => {
  const { data: user, isLoading, error } = useUser();
  const isAuthenticated = !!authStorage.getAccessToken() && !!user;

  return {
    user: user?.user || null,
    isAuthenticated,
    isLoading,
    error,
  };
};