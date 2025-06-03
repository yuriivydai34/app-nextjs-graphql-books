'use client';

import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface JWTPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

export const auth = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      // Set cookie for server-side authentication
      document.cookie = `${TOKEN_KEY}=${token}; path=/`;
      localStorage.setItem(TOKEN_KEY, token);
      
      // Extract and store user info from token
      try {
        const payload = JSON.parse(atob(token.split('.')[1])) as JWTPayload;
        const user = {
          _id: payload.sub,
          username: payload.username
        };
        auth.setUser(user);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      // Remove cookie
      document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return false;

      try {
        const payload = JSON.parse(atob(token.split('.')[1])) as JWTPayload;
        return payload.exp * 1000 > Date.now(); // exp is in seconds
      } catch {
        return false;
      }
    }
    return false;
  },

  setUser: (user: { _id: string; username: string }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  },

  logout: () => {
    auth.removeToken();
    auth.removeUser();
  },
}; 