'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider 
      value={{ 
        username, 
        setUsername, 
        isAuthenticated: !!username 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 