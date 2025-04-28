'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types/user';
import api from '@/services/api';
import { ApiResponse } from '@/types/api-response';
import { toast } from 'react-toastify';
import { showAxiosError } from '@/utils/showAxiosError';
import {isPublicRoute} from "@/utils/is-public-route";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        if (!isPublicRoute(router.pathname)) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [router.pathname]);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get<ApiResponse<User>>('/auth/profile');
            setUser(data.data);
        } catch (error) {
            setUser(null);
            if (!isPublicRoute(router.pathname)) {
                showAxiosError(error, 'Unauthorized');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const { data } = await api.post<ApiResponse<User>>('/auth/login', { email, password });
        setUser(data.data);
        toast.success('Logged in successfully!');
    };

    const register = async (email: string, password: string) => {
        const { data } = await api.post<ApiResponse<User>>('/auth/register', { email, password });
        setUser(data.data);
        toast.success('User registered successfully!');
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        toast.success('Logged out successfully!');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
