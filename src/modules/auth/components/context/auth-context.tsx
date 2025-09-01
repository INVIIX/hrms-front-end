"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TUser } from '../../helpers/types';
import apiClient from '@/lib/apiClient';
import { isRefreshing } from '@/lib/apiClient';
import { TfieldEmployee } from '@/modules/employee-data/model/employee-model';

const waitUntilNotRefreshing = () =>
    new Promise((resolve) => {
        const interval = setInterval(() => {
            if (!isRefreshing) {
                clearInterval(interval);
                resolve(true);
            }
        }, 100);
    });

type AuthContextType = {
    user: TfieldEmployee | null;
    loading: boolean;
    setUser: (user: TfieldEmployee | null) => void;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    setUser: () => { },
    refreshUser: async () => { },
    logout: async () => { },
});

const fetchUser = async () => {
    await waitUntilNotRefreshing();
    try {
        const response = await apiClient.get('/me');
        return response.data.data;
    } catch (err) {
        return Promise.reject(err);
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TfieldEmployee | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const user = await fetchUser();
            setUser(user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false); // loading selesai apapun hasilnya
        }
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout'); // sesuaikan endpoint
        } catch (err) {
            // log error jika ingin
        } finally {
            localStorage.removeItem('access_token');
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            await refreshUser();
        };
        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, refreshUser, logout }}>
            { children }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
