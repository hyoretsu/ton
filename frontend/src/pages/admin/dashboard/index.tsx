import { formatPhoneNumber } from '@hyoretsu/shared.utils';
import { User } from 'backend';
import { differenceInYears } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FiTarget } from 'react-icons/fi';

import api from '@api';

import {
    Patient,
    PatientButton,
    PatientButtons,
    PatientInfo,
    Patients,
    PatientTextGray,
    Styling,
} from '@styles/admin/dashboard';

const Dashboard: React.FC = () => {
    const [patients, setPatients] = useState<User[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/users');

            setPatients(data);
        };

        execute();
    }, []);

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
                                    <PatientButton type="button">
                                        <FiTarget color="#555" size={20} />
                                    </PatientButton>
                                    <PatientButton type="button">
                                        <BsChatLeftTextFill color="#555" size={20} />
                                    </PatientButton>
                                </PatientButtons>
                            </Patient>
                        );
                    })}
                </Patients>
            </Styling>
        </>
    );
};

export default Dashboard;
