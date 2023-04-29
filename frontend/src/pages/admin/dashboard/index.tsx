import { Link } from '@hyoretsu/react-components';
import { formatPhoneNumber } from '@hyoretsu/utils';
import { User } from 'backend';
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

    const [patients, setPatients] = useState<User[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            if (!loading) {
                const { data } = await api.get('/users');

                setPatients(data);
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
                                <BsChatLeftTextFill size={20} color="#555" />
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
