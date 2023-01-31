import AsyncStorage from '@react-native-async-storage/async-storage';
import { Objective, Progress } from 'backend';
import { differenceInCalendarDays } from 'date-fns';
import React, { createContext, useCallback, useState, useContext, useEffect, PropsWithChildren, useMemo } from 'react';

import api from '@api';

interface InfoContextData {
    objectives: Objective[];
    progress: Record<string, number>;
    updateProgress: (objectiveId: string, updatedProgress: number) => Promise<void>;
}

const InfoContext = createContext<InfoContextData>({} as InfoContextData);

const InfoProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [objectives, setObjectives] = useState<Objective[]>([]);
    const [progress, setProgress] = useState<Record<string, number>>({});

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const [[, storedObjectives], [, storedProgress]] = await AsyncStorage.multiGet([
                '@ton:objectives',
                '@ton:progress',
            ]);

            if (storedObjectives) {
                setObjectives(JSON.parse(storedObjectives));
            }
            if (storedProgress) {
                setProgress(JSON.parse(storedProgress));
            }

            let { data } = await api.get('/objectives');
            setObjectives(data);
            await AsyncStorage.setItem('@ton:objectives', JSON.stringify(data));

            ({ data } = await api.get('/objectives/progress'));
            const parsedProgress = (data as Progress[]).reduce((obj, entry) => {
                return {
                    ...obj,
                    [entry.objectiveId]:
                        !entry.objective.isDaily ||
                        differenceInCalendarDays(new Date(entry.createdAt), new Date()) === 0
                            ? entry.progress
                            : 0,
                };
            }, {});

            setProgress(old => ({
                ...old,
                ...parsedProgress,
            }));
            await AsyncStorage.setItem('@ton:progress', JSON.stringify(parsedProgress));
        };

        execute();
    }, []);

    const updateProgress = useCallback(
        async (objectiveId: string, updatedProgress: number) => {
            setProgress(old => ({ ...old, [objectiveId]: updatedProgress }));

            await api.post('/objectives/progress', {
                objectiveId,
                progress: updatedProgress,
            });

            await AsyncStorage.setItem('@ton:progress', JSON.stringify(progress));
        },
        [progress],
    );

    const contextData = useMemo(
        () => ({ objectives, progress, updateProgress }),
        [objectives, progress, updateProgress],
    );

    return <InfoContext.Provider value={contextData}>{children}</InfoContext.Provider>;
};

const useInfo = (): InfoContextData => {
    const context = useContext(InfoContext);

    if (!context) {
        throw new Error('useInfo must be used within an InfoProvider');
    }

    return context;
};

export { InfoProvider, useInfo };
