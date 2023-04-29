import { Link } from '@hyoretsu/react-components';
import { formatPhoneNumber } from '@hyoretsu/utils';
import { Message, User } from 'backend';
import { useAuth } from 'data/contexts/auth';
import { differenceInYears } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsChatLeftTextFill, BsUpload } from 'react-icons/bs';
import { FiBell, FiClipboard, FiEdit, FiTarget } from 'react-icons/fi';

import InfoGrid from '@components/InfoGrid';

import api from '@api';

const Dashboard: React.FC = () => {
    const { loading } = useAuth();
    const { push } = useRouter();

    const [newMessages, setNewMessages] = useState<Record<string, boolean>>({});
    const [patients, setPatients] = useState<User[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            if (!loading) {
                const { data } = await api.get<User[]>('/users');

                setPatients(data);

                data.forEach(async patient => {
                    const { data: messages } = await api.get<Message[]>(`/messages?patientId=${patient.id}`);
                    if (!messages.length) return;

                    const storedMessages = localStorage.getItem(`@ton:messages_${patient.id}`);
                    if (storedMessages) {
                        const parsedMessages = JSON.parse(storedMessages);

                        if (parsedMessages.length === messages.length) {
                            return;
                        }
                    }

                    setNewMessages(old => ({ ...old, [patient.id]: true }));
                });
            }
        };

        execute();
    }, [loading]);

    return (
        <>
            <NextSeo nofollow noindex />
            <nav>
                <Link href="/admin/objectives">Missões</Link>
            </nav>
            <InfoGrid newLink="/admin/patient/register">
                <div>
                    {patients.map(patient => (
                        <>
                            <span>Paciente: {patient.name}</span>
                            <p>{differenceInYears(new Date(), new Date(patient.birthDate))} anos</p>

                            <span>Parente: {patient.parentName}</span>
                            <p>{formatPhoneNumber(patient.phoneNumber, 'br', false)}</p>

                            <span>
                                {patient.city}, {patient.neoplasia?.toLowerCase()}, nº {patient.chartNumber}
                            </span>
                        </>
                    ))}
                </div>

                <div>
                    {patients.map(patient => (
                        <>
                            <button type="button" onClick={() => push(`/admin/patient/${patient.id}/edit`)}>
                                <FiEdit size={20} color="#555" />
                                Editar
                            </button>
                            <button type="button" onClick={() => push(`/admin/patient/${patient.id}/checkups`)}>
                                <FiClipboard size={20} color="#555" />
                                Exames
                            </button>
                            <button type="button" onClick={() => push(`/admin/patient/${patient.id}/objectives`)}>
                                <FiTarget size={20} color="#555" />
                                Diário
                            </button>
                            <button type="button" onClick={() => push(`/admin/patient/${patient.id}/chat`)}>
                                <BsChatLeftTextFill size={20} color={newMessages[patient.id] ? '#0f0' : '#555'} />
                                Chat
                            </button>
                            <button type="button" onClick={() => push(`/admin/patient/${patient.id}/notifications`)}>
                                <FiBell size={20} color="#555" />
                                Notificações
                            </button>
                            <button type="button" onClick={() => push(`/admin/patient/${patient.id}/periodic-info`)}>
                                <BsUpload size={20} color="#555" />
                                Att
                            </button>
                        </>
                    ))}
                </div>
            </InfoGrid>
        </>
    );
};

export default Dashboard;
