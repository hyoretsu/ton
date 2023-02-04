import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Keys = 'checkupAnswers' | 'objectiveProgress';

interface StorageContext {
    checkupProgress: Record<string, string>;
    storeValue: (key: Keys, value: any) => Promise<void>;
}

const StorageContext = createContext<StorageContext>({} as StorageContext);

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [checkupProgress, setCheckupProgress] = useState({});

    useEffect(() => {
        AsyncStorage.getItem('@ton:checkupProgress').then(storedProgress => {
            if (!storedProgress) {
                AsyncStorage.setItem('@ton:checkupProgress', JSON.stringify({}));

                return;
            }

            setCheckupProgress(JSON.parse(storedProgress));
        });
    }, []);

    const storeValue = useCallback(async (key: Keys, value: any) => {
        switch (key) {
            case 'checkupProgress':
                await AsyncStorage.setItem(`@ton:${key}`, JSON.stringify(value));
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
