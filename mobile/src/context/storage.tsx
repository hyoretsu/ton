import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Keys = 'checkupHistory' | 'checkupProgress' | 'sentCheckups' | 'symptomAnswers';
type Dict = Record<string, string>;

export interface CheckupHistory {
    answers: Dict;
    date: string;
    photos: Dict;
}

interface StorageContext {
    checkupHistory: CheckupHistory[];
    checkupProgress: Dict;
    sentCheckups: boolean[];
    storeValue: (key: Keys, value: any) => Promise<void>;
    symptomAnswers: Dict;
    setSymptomAnswers: (param: Dict | ((answers: Dict) => Dict)) => void;
}

const StorageContext = createContext<StorageContext>({} as StorageContext);

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [symptomAnswers, setSymptomAnswers] = useState({});
    const [checkupHistory, setCheckupHistory] = useState<CheckupHistory[]>([]);
    const [sentCheckups, setSentCheckups] = useState<boolean[]>([]);
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

            const storedSentCheckups = await AsyncStorage.getItem('@ton:sentCheckups');
            if (storedSentCheckups) {
                setSentCheckups(JSON.parse(storedSentCheckups));
            }
        };

        execute();
    }, []);

    const storeValue = useCallback(async (key: Keys, value: any) => {
        await AsyncStorage.setItem(`@ton:${key}`, JSON.stringify(value));

        switch (key) {
            case 'checkupHistory':
                setCheckupHistory(value);
                setSentCheckups(old => [false, ...old]);
                break;
            case 'checkupProgress':
                setCheckupProgress(value);
                break;
            case 'sentCheckups':
                setSentCheckups(value);
                break;
            case 'symptomAnswers':
                setSymptomAnswers(value);
                break;
        }
    }, []);

    const storage: StorageContext = useMemo(
        () => ({ checkupHistory, checkupProgress, sentCheckups, storeValue, symptomAnswers, setSymptomAnswers }),
        [checkupHistory, checkupProgress, sentCheckups, storeValue, symptomAnswers, setSymptomAnswers],
    );

    return <StorageContext.Provider value={storage}>{children}</StorageContext.Provider>;
};

export const useStorage = (): StorageContext => {
    return useContext(StorageContext);
};
