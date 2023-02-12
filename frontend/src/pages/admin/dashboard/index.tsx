import Link from '@hyoretsu/components.next-link';
import { formatPhoneNumber } from '@hyoretsu/shared.utils';
import { User } from 'backend';
import { useAuth } from 'data/contexts/auth';
import { differenceInYears } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsChatLeftTextFill, BsPlusSquareFill } from 'react-icons/bs';
import { FiTarget } from 'react-icons/fi';

import api from '@api';

import { Patient, PatientButtons, PatientInfo, Patients, PatientTextGray, Styling } from '@styles/admin/dashboard';

const Dashboard: React.FC = () => {
    const { loading, user } = useAuth();
    const { replace } = useRouter();

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
                                    <button type="button">
                                        <FiTarget color="#555" size={20} />
                                    </button>
                                    <button type="button">
                                        <BsChatLeftTextFill color="#555" size={20} />
                                    </button>
                                </PatientButtons>
                            </Patient>
                        );
                    })}
                    <Link href="/admin/patients/register">
                        <Patient id="addUser" style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <BsPlusSquareFill color="#555" size={120} />
                        </Patient>
                    </Link>
                </Patients>
            </Styling>
        </>
    );
};

export default Dashboard;
