import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
    updateStats: (stats: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('study_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (name: string, email: string) => {
        // In a real app, this would validate with a backend
        // For now, we simulate a successful login/register
        const newUser: User = {
            name,
            email,
            studyHours: 0,
            quizzesTaken: 0,
            avgScore: 0,
            masteries: 0,
            ...JSON.parse(localStorage.getItem(`user_${email}`) || '{}') // Restore user specific data if exists
        };

        // If it's a completely new user (no saved data), keep defaults. 
        // If they existed before, the spread above would have overwritten defaults.
        // Wait, the logic above is slightly flawed. Let's fix it.

        const existingData = localStorage.getItem(`user_${email}`);
        const userToSet = existingData ? JSON.parse(existingData) : newUser; // Use existing or new

        // Ensure name is updated if changed (optional)
        userToSet.name = name;

        setUser(userToSet);
        localStorage.setItem('study_user', JSON.stringify(userToSet)); // Current session
        localStorage.setItem(`user_${email}`, JSON.stringify(userToSet)); // Persistence
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('study_user');
    };

    const updateStats = (newStats: Partial<User>) => {
        setUser(prev => {
            if (!prev) return null;
            const updated = { ...prev, ...newStats };
            localStorage.setItem('study_user', JSON.stringify(updated));
            localStorage.setItem(`user_${prev.email}`, JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateStats }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
