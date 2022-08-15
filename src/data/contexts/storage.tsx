import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import objectives from 'assets/objectives.json';

type Keys = 'checkupProgress' | 'objectiveProgress';
type ObjectiveProgress = Record<string, number>;

interface StorageContext {
 checkupProgress: number;
 objectiveProgress: ObjectiveProgress;
 storeValue: (key: Keys, value: any) => Promise<void>;
}

const StorageContext = createContext<StorageContext>({} as StorageContext);

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
 const [checkupProgress, setCheckupProgress] = useState(0);
 const [objectiveProgress, setObjectiveProgress] = useState<ObjectiveProgress>({});

 useEffect(() => {
  AsyncStorage.getItem('@eOdontologia:checkupProgress').then(storedProgress => {
   if (!storedProgress) {
    AsyncStorage.setItem('@eOdontologia:checkupProgress', String(0));

    return;
   }

   setCheckupProgress(Number(storedProgress));
  });

  objectives.forEach(objective => {
   setObjectiveProgress(old => ({
    ...old,
    [objective.id]: 0,
   }));
  });
 }, [checkupProgress]);

 const storeValue = useCallback(async (key: Keys, value: any) => {
  switch (key) {
   case 'checkupProgress':
    await AsyncStorage.setItem(`@eOdontologia:${key}`, JSON.stringify(value));
    setCheckupProgress(value);
    break;

   case 'objectiveProgress':
    setObjectiveProgress(old => ({
     ...old,
     [value[0]]: value[1],
    }));
    break;
  }
 }, []);

 const storage: StorageContext = useMemo(
  () => ({ checkupProgress, objectiveProgress, storeValue }),
  [checkupProgress, objectiveProgress, storeValue],
 );

 return <StorageContext.Provider value={storage}>{children}</StorageContext.Provider>;
};

export const useStorage = (): StorageContext => {
 return useContext(StorageContext);
};
