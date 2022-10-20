import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Objective, Progress } from 'backend';
import { differenceInCalendarDays } from 'date-fns';
import { useEffect, useState } from 'react';

import BottomBar from '@components/BottomBar';
import ProgressCircle from '@components/ProgressCircle';

import api from '@api';

import {
    Container,
    DailyObjectiveText,
    ObjectiveView,
    ObjectiveTitle,
    ProgressBar,
    ProgressBarColor,
    ProgressBarText,
    ProgressSign,
} from '@styles/Diary';

const Diary: React.FC = () => {
    const { navigate } = useNavigation();

    const [objectives, setObjectives] = useState<Objective[]>([]);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [timer, setTimer] = useState<[string, number]>(['', 0]);

    const handlePlusMinus = async (action: string, objectiveId: string): Promise<void> => {
        const updatedProgress = (progress[objectiveId] || 0) + (action === 'plus' ? 1 : -1);

        await api.post('/objectives/progress', {
            objectiveId,
            progress: updatedProgress,
        });

        setProgress(old => ({ ...old, [objectiveId]: updatedProgress }));
    };

    useEffect(() => {
        AsyncStorage.getItem('@eOdontologia:objectives').then(storedObjectives => {
            if (storedObjectives) {
                setObjectives(JSON.parse(storedObjectives));
            }

            api.get('/objectives').then(({ data }) => {
                setObjectives(data);
                AsyncStorage.setItem('@eOdontologia:objectives', JSON.stringify(data));
            });
        });

        AsyncStorage.getItem('@eOdontologia:progress').then(storedProgress => {
            if (storedProgress) {
                setProgress(JSON.parse(storedProgress));
            }

            api.get('/objectives/progress').then(({ data }: { data: Progress[] }) => {
                const parsedProgress = data.reduce((obj, entry) => {
                    return {
                        ...obj,
                        [entry.objectiveId]:
                            !entry.objective.isDaily || differenceInCalendarDays(entry.createdAt, new Date()) === 0
                                ? entry.progress
                                : 0,
                    };
                }, {});

                setProgress(old => ({
                    ...old,
                    ...parsedProgress,
                }));
                AsyncStorage.setItem('@eOdontologia:progress', JSON.stringify(parsedProgress));
            });
        });
    }, []);

    useEffect(() => {
        notifee.getInitialNotification().then(notification => {
            if (notification) {
                // @ts-ignore
                navigate('Chat', { content: notification.notification.body });
            }
        });
    }, [navigate]);

    const handlePlus = (id: string, time: number | null): void => {
        if (!time) {
            handlePlusMinus('plus', id).then(() => setTimer(['', 0]));
            return;
        }

        setTimer([id, time]);

        for (let i = 1; i <= time; i++) {
            setTimeout(() => setTimer(old => [old[0], old[1] - 1]), 1000 * i);
        }

        setTimeout(() => {
            handlePlusMinus('plus', id).then(() => setTimer(['', 0]));
        }, 1000 * time);
    };

    return (
        <>
            <Container
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 0, flex: 1 }}
            >
                {objectives.map(objective => (
                    <ObjectiveView key={objective.id}>
                        <ObjectiveTitle>{objective.title}</ObjectiveTitle>
                        {objective.isDaily && <DailyObjectiveText>Missão diária</DailyObjectiveText>}
                        <ProgressBar>
                            <ProgressBarColor progress={progress[objective.id] / objective.goal} />
                            {progress[objective.id] > 0 && (
                                <ProgressSign
                                    sign="minus"
                                    onPress={() => handlePlusMinus('minus', objective.id)}
                                    style={{}}
                                />
                            )}
                            <ProgressBarText>
                                {progress[objective.id] || 0} / {objective.goal}
                            </ProgressBarText>
                            {(progress[objective.id] || 0) < objective.goal && (
                                <ProgressSign sign="plus" onPress={() => handlePlus(objective.id, objective.time)} />
                            )}
                        </ProgressBar>

                        {timer[0] === objective.id && objective.time && (
                            <ProgressCircle
                                progress={timer[1] / objective.time || objective.time}
                                radius={100}
                                color="#c4d3f2"
                                background="#a3bee9"
                                text={`${Math.floor((timer[1] || objective.time) / 60)}:${String(
                                    (timer[1] || objective.time) % 60,
                                ).padStart(2, '0')}`}
                                style={{ marginTop: 12 }}
                            />
                        )}
                    </ObjectiveView>
                ))}
            </Container>

            <BottomBar />
        </>
    );
};

export default Diary;
