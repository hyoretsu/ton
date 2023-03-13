import { useState } from 'react';

import BottomBar from '@components/BottomBar';
import ProgressCircle from '@components/ProgressCircle';
import { useInfo } from '@context/info';

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
    const { objectives, progress, updateProgress } = useInfo();

    const [timer, setTimer] = useState<[string, number]>(['', 0]);

    const handlePlusMinus = async (action: string, objectiveId: string): Promise<void> => {
        const updatedProgress = (progress[objectiveId] || 0) + (action === 'plus' ? 1 : -1);

        updateProgress(objectiveId, updatedProgress);
    };

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
                {(objectives || []).map(objective => (
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
