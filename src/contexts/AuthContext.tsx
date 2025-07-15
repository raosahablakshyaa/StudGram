import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  university: string;
  major: string;
  year: string;
  isPremium: boolean;
  followers: string[];
  following: string[];
  joinDate: string;
  topTopics: string[];
  weakTopics: string[];
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'project' | 'certification' | 'competition' | 'skill';
  date: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const followUser = (userId: string) => {
    if (user && !user.following.includes(userId)) {
      const updatedUser = {
        ...user,
        following: [...user.following, userId]
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const unfollowUser = (userId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        following: user.following.filter(id => id !== userId)
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, followUser, unfollowUser }}>
      {children}
    </AuthContext.Provider>
  );
};