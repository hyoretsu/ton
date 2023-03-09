import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'backend';
import React, { createContext, useCallback, useState, useContext, useEffect, PropsWithChildren, useMemo } from 'react';

import api from '@api';

export interface AuthInfo {
    token: string;
    user: User;
}

interface AuthContextData {
    finishLogin(credentials: AuthInfo): Promise<void>;
    signOut(): void;
    updateUser(user: User): Promise<void>;
    user: User;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.multiGet(['@ton:token', '@ton:user']).then(([[, token], [, user]]) => {
            if (token && user) {
                api.defaults.headers.common.Authorization = `Bearer ${token}`;

                setUser(JSON.parse(user));
            }

            setLoading(false);
        });
    }, []);

    const finishLogin = useCallback(async ({ token, user }: AuthInfo) => {
        await AsyncStorage.multiSet([
            ['@ton:token', token],
            ['@ton:user', JSON.stringify(user)],
        ]);

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setUser(user);
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@ton:token', '@ton:user']);

        setUser(undefined);
    }, []);

    const updateUser = useCallback(async (user: User) => {
        await AsyncStorage.setItem('@ton:user', JSON.stringify(user));

        setUser(user);
    }, []);

    const authData = useMemo(
        () => ({ finishLogin, signOut, updateUser, user: data, loading }),
        [finishLogin, signOut, updateUser, data, loading],
    );

    // @ts-ignore
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};
