import { Field, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';

import api from '@api';

import { EditPatientForm, Styling } from '@styles/admin/patient/[patientId]/edit';

interface FormFields {
    chartNumber: string;
    city: string;
    email: string;
    password: string;
    phoneNumber: string;
    treatment: string;
}

const Edit: React.FC = () => {
    const {
        back,
        query: { patientId },
    } = useRouter();

    const editPatient = async (data: FormFields): Promise<void> => {
        await api.patch('/users', {
            ...Object.entries(data)
                .filter(([key, value]) => value)
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), []),
            userId: patientId,
        });

        back();
    };

    return (
        <>
            <NextSeo title="Editar paciente" nofollow noindex />
            <Styling>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>

                <Formik
                    initialValues={
                        {
                            chartNumber: '',
                            city: '',
                            email: '',
                            password: '',
                            phoneNumber: '',
                            treatment: '',
                        } as FormFields
                    }
                    onSubmit={editPatient}
                    validationSchema={yup.object().shape({
                        chartNumber: yup.string(),
                        city: yup.string(),
                        email: yup.string().email(),
                        password: yup.string(),
                        phoneNumber: yup.string().matches(/\d{2}9?\d{8}/),
                        treatment: yup.string(),
                    })}
                >
                    <EditPatientForm>
                        <div>
                            <label htmlFor="chartNumber">Nº de prontuário</label>
                            <Field name="chartNumber" />
                        </div>
                        <div>
                            <label htmlFor="city">Cidade</label>
                            <Field name="city" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <Field name="email" />
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <Field name="password" type="password" />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber">Telefone</label>
                            <Field name="phoneNumber" />
                        </div>
                        <div>
                            <label htmlFor="treatment">Tratamento</label>
                            <Field name="treatment" />
                        </div>

                        <button type="submit">Enviar</button>
                    </EditPatientForm>
                </Formik>
            </Styling>
        </>
    );
};

export default Edit;
