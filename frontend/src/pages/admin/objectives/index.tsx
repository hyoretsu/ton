import { Objective } from 'backend';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';

import InfoGrid from '@components/InfoGrid';

import api from '@api';

const Objectives: React.FC = () => {
    const { back, push } = useRouter();

    const [objectives, setObjectives] = useState<Objective[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/objectives');

            setObjectives(data);
        };

        execute();
    }, []);

    return (
        <>
            <NextSeo title="Missões" nofollow noindex />
            <div>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>
                <InfoGrid newLink="/admin/objectives/create">
                    <div>
                        {objectives.map(objective => (
                            <>
                                <span>{objective.title}</span>
                                {objective.isDaily && <p>Diário</p>}
                                <span>{objective.goal} vezes</span>
                                {objective.time && (
                                    <span style={{ marginTop: '1vh' }}>Duração de {objective.time / 60}min</span>
                                )}
                            </>
                        ))}
                    </div>

                    <div>
                        {objectives.map(objective => (
                            <>
                                <button
                                    type="button"
                                    onClick={() => push(`/admin/objectives/${objective.id}/notifications`)}
                                >
                                    <BsChatLeftTextFill size={20} color="#555" />
                                    Notificações
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        api.delete(`/objectives/${objective.id}`);
                                        setObjectives(old => old.filter(o => o.id === objective.id));
                                    }}
                                >
                                    <FiTrash2 size={20} color="#555" />
                                    Excluir
                                </button>
                            </>
                        ))}
                    </div>
                </InfoGrid>
            </div>
        </>
    );
};

export default Objectives;
