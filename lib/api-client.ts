import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authStorage } from './auth-storage';

class ApiClient {
  private static instance: ApiClient;
  public axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;

  private constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const apiUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor - attach access token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = authStorage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle 401 and refresh token
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config;

        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            authStorage.setAccessToken(newAccessToken);
            
            // Retry original request with new token
            original.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.axiosInstance.request(original);
          } catch (refreshError) {
            // Refresh failed - logout user
            this.logout();
            // Redirect to login page
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    // Prevent multiple refresh requests
    if (this.isRefreshing) {
      if (this.refreshPromise) {
        return this.refreshPromise;
      }
    }

    this.isRefreshing = true;
    const refreshToken = authStorage.getRefreshToken();

    if (!refreshToken) {
      this.isRefreshing = false;
      throw new Error('No refresh token available');
    }

    this.refreshPromise = (async () => {
      try {
        const response = await axios.post(
          `${this.axiosInstance.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );
        
        const { accessToken } = response.data;
        return accessToken;
      } catch (error) {
        // Refresh token expired or invalid
        authStorage.clearAllTokens();
        throw new Error('Refresh token expired');
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  public logout(): void {
    authStorage.clearAllTokens();
  }

  // API Methods
  public async login(credentials: { email: string; password: string }) {
    const response = await this.axiosInstance.post('/auth/login', credentials);
    const { accessToken, refreshToken } = response.data;
    
    // Store tokens according to requirements
    authStorage.setAccessToken(accessToken);
    authStorage.setRefreshToken(refreshToken);
    
    return response.data;
  }

  public async logout_api(): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.logout();
    }
  }

  public async getProfile() {
    return this.axiosInstance.get('/auth/me');
  }

  public async register(userData: { email: string; password: string }) {
    return this.axiosInstance.post('/auth/register', userData);
  }
}

export const apiClient = ApiClient.getInstance().axiosInstance;
export const authApi = ApiClient.getInstance();