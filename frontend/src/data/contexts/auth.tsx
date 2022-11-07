import { User } from 'backend';
import React, { createContext, useCallback, useState, useContext, useEffect, PropsWithChildren, useMemo } from 'react';

import api from '@api';

export interface AuthInfo {
    token: string;
    user: User;
}

interface AuthContextData {
    finishLogin(credentials: AuthInfo): void;
    signOut(): void;
    updateUser(user: User): void;
    user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<User>({} as User);

    useEffect(() => {
        const token = localStorage.getItem('@eOdontologia:token');
        const user = localStorage.getItem('@eOdontologia:user');

        if (token && user) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            setData(JSON.parse(user));
        }
    }, []);

    const finishLogin = useCallback(({ token, user }: AuthInfo) => {
        localStorage.setItem('@eOdontologia:token', token);
        localStorage.setItem('@eOdontologia:user', JSON.stringify(user));

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setData(user);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@eOdontologia:token');
        localStorage.removeItem('@eOdontologia:user');

        setData({} as User);
    }, []);

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@eOdontologia:user', JSON.stringify(user));

        setData(user);
    }, []);

    const authData = useMemo(
        () => ({ finishLogin, signOut, updateUser, user: data }),
        [finishLogin, signOut, updateUser, data],
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
