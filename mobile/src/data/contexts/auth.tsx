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
  user: User;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.multiGet(['@eOdontologia:token', '@eOdontologia:user']).then(([[, token], [, user]]) => {
      if (token && user) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setData(JSON.parse(user));
      }

      setLoading(false);
    });
  }, []);

  const finishLogin = useCallback(async ({ token, user }: AuthInfo) => {
    await AsyncStorage.multiSet([
      ['@eOdontologia:token', token],
      ['@eOdontologia:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData(user);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@eOdontologia:token', '@eOdontologia:user']);

    setData({} as User);
  }, []);

  const authData = useMemo(
    () => ({ finishLogin, signOut, user: data, loading }),
    [finishLogin, signOut, data, loading],
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
