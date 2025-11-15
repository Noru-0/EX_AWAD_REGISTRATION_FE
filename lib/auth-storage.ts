// Auth Token Storage Management
// Access token in memory, refresh token in localStorage as per requirements

class AuthStorage {
  private static instance: AuthStorage;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): AuthStorage {
    if (!AuthStorage.instance) {
      AuthStorage.instance = new AuthStorage();
    }
    return AuthStorage.instance;
  }

  // Access Token (Memory Storage)
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }

  // Refresh Token (localStorage)
  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', token);
    }
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  clearRefreshToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refreshToken');
    }
  }

  // Clear all tokens (logout)
  clearAllTokens(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Get tokens for API requests
  getTokens() {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken()
    };
  }
}

export const authStorage = AuthStorage.getInstance();