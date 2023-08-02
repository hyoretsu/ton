import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Keys = 'checkupHistory' | 'checkupProgress' | 'symptomAnswers';
type Dict = Record<string, string>;

interface StorageContext {
    checkupHistory: Dict[];
    checkupProgress: Dict;
    storeValue: (key: Keys, value: any) => Promise<void>;
    symptomAnswers: Dict;
    setSymptomAnswers: (param: Dict | ((answers: Dict) => Dict)) => void;
}

const StorageContext = createContext<StorageContext>({} as StorageContext);

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [symptomAnswers, setSymptomAnswers] = useState({});
    const [checkupHistory, setCheckupHistory] = useState([]);
    const [checkupProgress, setCheckupProgress] = useState({});

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const storedProgress = await AsyncStorage.getItem('@ton:checkupProgress');
            if (!storedProgress) {
                AsyncStorage.setItem('@ton:checkupProgress', JSON.stringify({}));

                return;
            }
            setCheckupProgress(JSON.parse(storedProgress));

            const storedAnswers = await AsyncStorage.getItem('@ton:symptomAnswers');
            if (storedAnswers) {
                setSymptomAnswers(JSON.parse(storedAnswers));
            }

            const storedHistory = await AsyncStorage.getItem('@ton:checkupHistory');
            if (storedHistory) {
                setCheckupHistory(JSON.parse(storedHistory));
            }
        };

        execute();
    }, []);

    const storeValue = useCallback(async (key: Keys, value: any) => {
        await AsyncStorage.setItem(`@ton:${key}`, JSON.stringify(value));

        switch (key) {
            case 'checkupHistory':
                setCheckupHistory(value);
                break;
            case 'checkupProgress':
                setCheckupProgress(value);
                break;
            case 'symptomAnswers':
                setSymptomAnswers(value);
                break;
        }
    }, []);

    const storage: StorageContext = useMemo(
        () => ({ checkupHistory, checkupProgress, storeValue, symptomAnswers, setSymptomAnswers }),
        [checkupHistory, checkupProgress, storeValue, symptomAnswers, setSymptomAnswers],
    );

    return <StorageContext.Provider value={storage}>{children}</StorageContext.Provider>;
};

export const useStorage = (): StorageContext => {
    return useContext(StorageContext);
};
