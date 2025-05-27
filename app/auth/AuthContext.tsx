'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: { email: string } | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ email: payload.user_email });
        } catch(err) {
            console.error('Invalid token');
            localStorage.removeItem('token');
        }
    }
  }, []);


  const login = async (user_email: string, user_password: string) => {
    const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email, user_password }),
    });

    const data = await res.json();
    console.log('Gelen veri:', data); 
    
    if (res.ok && data.accessToken) {
        localStorage.setItem('token', data.accessToken);

        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        // Test
        console.log("TOKEN:", data.accessToken);
        console.log("PAYLOAD:", payload);

        setUser({ email: payload.user_email });
    } else {
        throw new Error(data.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}