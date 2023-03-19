import Link from '@hyoretsu/components.next-link';
import { formatPhoneNumber } from '@hyoretsu/shared.utils';
import { User } from 'backend';
import { useAuth } from 'data/contexts/auth';
import { differenceInYears } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsChatLeftTextFill, BsPlusSquareFill, BsUpload } from 'react-icons/bs';
import { FiClipboard, FiTarget } from 'react-icons/fi';

import api from '@api';

import { Patient, PatientButtons, PatientInfo, Patients, PatientTextGray, Styling } from '@styles/admin/dashboard';

const Dashboard: React.FC = () => {
    const { loading, user } = useAuth();
    const { push, replace } = useRouter();

    const [patients, setPatients] = useState<User[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            if (!user) {
                if (!loading) {
                    replace('/login');
                }
            } else {
                const { data } = await api.get('/users');

                setPatients(data);
            }
        };

        execute();
    }, [loading, replace, user]);

    return (
        <>
            <NextSeo nofollow noindex />
            <Styling>
                <Patients>
                    {patients.map(patient => {
                        return (
                            <Patient key={patient.id}>
                                <PatientInfo>
                                    <span>Paciente: {patient.name}</span>
                                    <PatientTextGray>
                                        {differenceInYears(new Date(), new Date(patient.birthDate))} anos
                                    </PatientTextGray>

                                    <span>Parente: {patient.parentName}</span>
                                    <PatientTextGray>
                                        {formatPhoneNumber(patient.phoneNumber, 'br', false)}
                                    </PatientTextGray>

                                    <span>
                                        {patient.city}, {patient.neoplasia?.toLowerCase()}, nº {patient.chartNumber}
                                    </span>
                                </PatientInfo>
                                <PatientButtons>
                                    <button type="button" onClick={() => push(`/admin/patient/${patient.id}/checkups`)}>
                                        <FiClipboard size={20} color="#555" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => push(`/admin/patient/${patient.id}/objectives`)}
                                    >
                                        <FiTarget size={20} color="#555" />
                                    </button>
                                    <button type="button">
                                        <BsChatLeftTextFill size={20} color="#555" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => push(`/admin/patient/${patient.id}/periodic-info`)}
                                    >
                                        <BsUpload size={20} color="#555" />
                                    </button>
                                </PatientButtons>
                            </Patient>
                        );
                    })}
                    <Link href="/admin/patient/register">
                        <Patient id="addUser" style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <BsPlusSquareFill size={120} color="#555" />
                        </Patient>
                    </Link>
                </Patients>
            </Styling>
        </>
    );
};

export default Dashboard;
