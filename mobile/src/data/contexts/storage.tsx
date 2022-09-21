import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Keys = 'checkupProgress' | 'objectiveProgress';

interface StorageContext {
  checkupProgress: number;
  storeValue: (key: Keys, value: any) => Promise<void>;
}

const StorageContext = createContext<StorageContext>({} as StorageContext);

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [checkupProgress, setCheckupProgress] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('@eOdontologia:checkupProgress').then(storedProgress => {
      if (!storedProgress) {
        AsyncStorage.setItem('@eOdontologia:checkupProgress', String(0));

        return;
      }

      setCheckupProgress(Number(storedProgress));
    });
  }, [checkupProgress]);

  const storeValue = useCallback(async (key: Keys, value: any) => {
    switch (key) {
      case 'checkupProgress':
        await AsyncStorage.setItem(`@eOdontologia:${key}`, JSON.stringify(value));
        setCheckupProgress(value);
        break;
    }
  }, []);

  const storage: StorageContext = useMemo(() => ({ checkupProgress, storeValue }), [checkupProgress, storeValue]);

  return <StorageContext.Provider value={storage}>{children}</StorageContext.Provider>;
};

export const useStorage = (): StorageContext => {
  return useContext(StorageContext);
};
