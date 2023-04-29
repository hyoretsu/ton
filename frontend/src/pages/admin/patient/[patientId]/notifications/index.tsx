import { Objective, ObjectiveNotification } from 'backend';
import { format } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import InfoGrid from '@components/InfoGrid';

import api from '@api';

const Notifications: React.FC = () => {
    const {
        back,
        query: { patientId },
    } = useRouter();

    const [notifications, setNotifications] = useState<ObjectiveNotification[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get(`/objectives/notifications?patientId=${patientId}`);

            setNotifications(data);
        };

        execute();
    }, [patientId]);

    return (
        <>
            <NextSeo title="Notificações" nofollow noindex />
            <div>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>

                <InfoGrid newLink={`/admin/patient/${patientId}/notifications/create`}>
                    <div>
                        {notifications.map(notification => (
                            <>
                                <p>
                                    {notification.objective.title}
                                    {notification.objective.isDaily && ' (Diária)'}
                                </p>
                                <span key={notification.id}>
                                    Notificação às {format(new Date(notification.time), 'HH:mm')}
                                </span>
                            </>
                        ))}
                    </div>

                    <div>
                        {notifications.map(notification => (
                            <button
                                key={notification.id}
                                type="button"
                                onClick={() => {
                                    api.delete(`/objectives/notifications/${notification.id}`);
                                    setNotifications(old => old.filter(o => o.id !== notification.id));
                                }}
                            >
                                <FiTrash2 size={20} color="#555" />
                                Excluir
                            </button>
                        ))}
                    </div>
                </InfoGrid>
            </div>
        </>
    );
};

export default Notifications;
