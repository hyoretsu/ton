import { FlatListIndicator } from '@fanchenbao/react-native-scroll-indicator';
import { Objective } from 'backend';
import { useState } from 'react';
import { View, ViewStyle } from 'react-native';

import Modal from '@components/Modal';
import OpacityFilter from '@components/OpacityFilter';
import ProgressCircle from '@components/ProgressCircle';
import Row from '@components/Row';
import { useInfo } from '@context/info';

import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';

import {
    ObjectiveCheck,
    ObjectiveLink,
    ObjectiveTitle,
    ObjectiveView,
    ObjectivesListTitle,
    ProgressBar,
    ProgressBarColor,
    ProgressBarText,
    ProgressSign,
} from './styles';

interface ObjectivesListProps {
    style?: ViewStyle;
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({ style }) => {
    const { objectives, progress, updateProgress } = useInfo();

    const [currentObjective, setCurrentObjective] = useState<Objective | null>(null);
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
            setTimeout(() => {
                if (currentObjective?.id === id) {
                    setTimer(old => [old[0], old[1] - 1]);
                }
            }, 1000 * i);
        }

        setTimeout(() => {
            if (currentObjective?.id === id) {
                handlePlusMinus('plus', id).then(() => setTimer(['', 0]));
            }
        }, 1000 * time);
    };

    return (
        <>
            <View style={style}>
                <Row>
                    <ObjectivesListTitle>Metas do dia:</ObjectivesListTitle>
                </Row>

                <View>
                    <FlatListIndicator
                        indStyle={{ backgroundColor: mainTheme.colors.purple }}
                        flatListProps={{
                            data: objectives,
                            renderItem: ({ item: objective }) => {
                                const completed = (progress[objective.id] || 0) === objective.goal;

                                return (
                                    <ObjectiveView
                                        key={objective.id}
                                        completed={completed}
                                        onPress={() => !completed && setCurrentObjective(objective)}
                                    >
                                        <ObjectiveTitle completed={completed}>{objective.title}</ObjectiveTitle>

                                        {completed ? <ObjectiveCheck /> : <ObjectiveLink>{'>'}</ObjectiveLink>}
                                    </ObjectiveView>
                                );
                            },
                            style: {
                                marginTop: 1 * vh,
                                maxHeight: 20 * vh,
                                paddingRight: 5 * vw,
                            },
                        }}
                    />
                </View>
            </View>

            {currentObjective && (
                <OpacityFilter style={{ zIndex: 1 }}>
                    <Modal
                        button={false}
                        icon={false}
                        onConfirm={() => {
                            if (timer[1] === 0) {
                                setCurrentObjective(null);
                            }
                        }}
                    >
                        <ProgressBar>
                            <ProgressBarColor progress={progress[currentObjective.id] / currentObjective.goal} />
                            {progress[currentObjective.id] > 0 && (
                                <ProgressSign
                                    sign="minus"
                                    onPress={() => handlePlusMinus('minus', currentObjective.id)}
                                    style={{}}
                                />
                            )}
                            <ProgressBarText>
                                {progress[currentObjective.id] || 0} / {currentObjective.goal}
                            </ProgressBarText>
                            {(progress[currentObjective.id] || 0) < currentObjective.goal && (
                                <ProgressSign
                                    sign="plus"
                                    onPress={() => handlePlus(currentObjective.id, currentObjective.time)}
                                />
                            )}
                        </ProgressBar>

                        {timer[0] === currentObjective.id && currentObjective.time && (
                            <ProgressCircle
                                progress={timer[1] / currentObjective.time || currentObjective.time}
                                radius={100}
                                color={mainTheme.colors.gold}
                                background={mainTheme.colors.background}
                                text={`${Math.floor((timer[1] || currentObjective.time) / 60)}:${String(
                                    (timer[1] || currentObjective.time) % 60,
                                ).padStart(2, '0')}`}
                                style={{ marginTop: 4 * vh }}
                            />
                        )}
                    </Modal>
                </OpacityFilter>
            )}
        </>
    );
};

export default ObjectivesList;
