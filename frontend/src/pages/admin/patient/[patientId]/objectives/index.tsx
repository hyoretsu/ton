import { Objective, Progress } from 'backend';
import { isWithinInterval } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';

import api from '@api';

import { Box, Column, ObjectivesList, Row, Styling } from '@styles/admin/patient/[patientId]/objectives';

interface ProgressInfo {
    quantity: number;
    total: number;
}

const Objectives: React.FC = () => {
    const {
        back,
        query: { patientId },
    } = useRouter();

    const [objectives, setObjectives] = useState<Record<string, Objective>>([]);
    const [progresses, setProgresses] = useState<Record<string, ProgressInfo>>({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get<Progress[]>(`/objectives/progress?userId=${patientId}`);
            setProgresses(
                data.reduce((compound, progress) => {
                    if (
                        isWithinInterval(new Date(progress.createdAt), {
                            start: startDate,
                            end: endDate,
                        })
                    ) {
                        return {
                            ...compound,
                            [progress.objectiveId]: {
                                quantity: (compound[progress.objectiveId]?.quantity || 0) + progress.progress,
                                total: (compound[progress.objectiveId]?.total || 0) + progress.objective.goal,
                            },
                        };
                    }

                    return compound;
                }, {}),
            );

            const { data: objectiveData } = await api.get<Objective[]>('/objectives');
            setObjectives(
                objectiveData.reduce(
                    (compound, objective) => ({
                        ...compound,
                        [objective.id]: objective,
                    }),
                    {},
                ),
            );
        };

        execute();
    }, [endDate, patientId, startDate]);

    return (
        <>
            <NextSeo title="Missões" nofollow noindex />
            <Styling>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>
                <Row style={{ marginBottom: '4vh', marginTop: '4vh' }}>
                    <Column>
                        <label htmlFor="startDate">Data da consulta passada</label>
                        <DatePicker name="startDate" onChange={(date: Date) => setStartDate(date)} value={startDate} />
                    </Column>

                    <Column style={{ marginLeft: '2vw' }}>
                        <label htmlFor="endDate">Data da próxima consulta</label>
                        <DatePicker name="endDate" onChange={(date: Date) => setEndDate(date)} value={endDate} />
                    </Column>
                </Row>
                <ObjectivesList>
                    {Object.entries(objectives).map(([objectiveId, objective]) => {
                        const progress = progresses[objectiveId];
                        if (!progress) return null;

                        const progressRatio = Number((progress.quantity / progress.total).toPrecision(2));

                        let progressRank = 'Bronze';
                        if (progressRatio >= 0.3 && progressRatio < 0.7) {
                            progressRank = 'Prata';
                        } else if (progressRatio >= 0.7 && progressRatio < 1) {
                            progressRank = 'Ouro';
                        } else if (progressRatio === 1) {
                            progressRank = 'Platina';
                        }

                        return (
                            <Box key={objectiveId}>
                                <p>{objective.title}</p>
                                <p style={{ margin: 'auto' }}>
                                    {progress.quantity} concluídas de {progress.total}
                                </p>
                                <p>
                                    Nível {progressRank} ({progressRatio * 100}%)
                                </p>
                            </Box>
                        );
                    })}
                </ObjectivesList>
            </Styling>
        </>
    );
};

export default Objectives;
