import { User } from 'backend';
import React, { createContext, useCallback, useState, useContext, useEffect, PropsWithChildren, useMemo } from 'react';

import api from '@api';

export interface AuthInfo {
    token: string;
    user: User;
}

interface AuthContextData {
    finishLogin(credentials: AuthInfo): void;
    loading: boolean;
    signOut(): void;
    updateUser(user: User): void;
    user: User | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('@ton:token');
        const user = localStorage.getItem('@ton:user');

        if (token && user) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            setData(JSON.parse(user));
        }

        setLoading(false);
    }, []);

    const finishLogin = useCallback(({ token, user }: AuthInfo) => {
        localStorage.setItem('@ton:token', token);
        localStorage.setItem('@ton:user', JSON.stringify(user));

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setData(user);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@ton:token');
        localStorage.removeItem('@ton:user');

        setData({} as User);
    }, []);

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@ton:user', JSON.stringify(user));

        setData(user);
    }, []);

    const authData = useMemo(
        () => ({ finishLogin, loading, signOut, updateUser, user: data }),
        [finishLogin, loading, signOut, updateUser, data],
    );

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
