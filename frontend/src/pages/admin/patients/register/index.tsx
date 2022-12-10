import Modal from '@hyoretsu/components.modal';
import { useAuth } from 'data/contexts/auth';
import { format } from 'date-fns';
import { Field, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import api from '@api';

import { FieldGroup, LabelInput, RegisterForm, Styling } from '@styles/admin/patients/register';

interface FormFields {
    appointmentsEnd: Date;
    appointmentsStart: Date;
    birthDate: Date;
    chartNumber: string;
    city: string;
    email: string;
    name: string;
    neoplasia: string;
    password: string;
    parentName: string;
    phoneNumber: string;
}

const Register: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [error, setError] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    const finishRegister = async (values: FormFields): Promise<void> => {
        const formatDate = (date: Date): number => {
            return format(new Date(date), 'HH:mm')
                .split(':')
                .map((value, index) => (index === 1 ? Number(value) / 60 : Number(value)))
                .reduce((sum, value) => sum + value, 0);
        };

        try {
            if (isDoctor) {
                let chartNumber, neoplasia, parentName;
                // @ts-ignore
                // eslint-disable-next-line prefer-const
                ({ chartNumber, neoplasia, parentName, ...values } = values);

                await api.post('/users', {
                    ...values,
                    appointmentsEnd: formatDate(values.appointmentsEnd),
                    appointmentsStart: formatDate(values.appointmentsStart),
                });
            } else {
                let appointmentsEnd, appointmentsStart;
                // @ts-ignore
                // eslint-disable-next-line prefer-const
                ({ appointmentsEnd, appointmentsStart, ...values } = values);

                await api.post('/users', { ...values, doctorId: user.id });
            }

            router.push('/admin/dashboard');
        } catch ({ response }) {
            if (response.status === 400) {
                setError(response.data.validation?.body.message || response.data.message);
            }
        }
    };

    return (
        <>
            <NextSeo nofollow noindex />
            {error && <Modal onConfirm={() => setError('')}>{error}</Modal>}
            <Styling>
                <Formik
                    initialValues={{
                        appointmentsEnd: new Date(),
                        appointmentsStart: new Date(),
                        birthDate: new Date(),
                        chartNumber: '',
                        city: '',
                        email: '',
                        name: '',
                        neoplasia: '',
                        password: '',
                        parentName: '',
                        phoneNumber: '',
                    }}
                    onSubmit={finishRegister}
                >
                    {({ setFieldValue, values }) => (
                        <RegisterForm>
                            <FieldGroup>
                                <LabelInput>
                                    <label htmlFor="name">Nome do paciente</label>
                                    <Field name="name" />
                                </LabelInput>
                                {!isDoctor && (
                                    <LabelInput>
                                        <label htmlFor="parentName">Nome do responsável</label>
                                        <Field name="parentName" />
                                    </LabelInput>
                                )}
                            </FieldGroup>

                            <FieldGroup>
                                <LabelInput>
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" />
                                </LabelInput>
                                <LabelInput>
                                    <label htmlFor="password">Senha</label>
                                    <Field name="password" type="password" />
                                </LabelInput>
                            </FieldGroup>

                            <FieldGroup>
                                {isDoctor ? (
                                    <>
                                        <LabelInput>
                                            <label htmlFor="appointmentsStart">Início do atendimento</label>
                                            <DatePicker
                                                name="appointmentsStart"
                                                selected={values.appointmentsStart}
                                                onChange={date => setFieldValue('appointmentsStart', date)}
                                                timeIntervals={30}
                                                showTimeSelectOnly
                                                dateFormat="p"
                                            />
                                        </LabelInput>
                                        <LabelInput>
                                            <label htmlFor="appointmentsEnd">Fim do atendimento</label>
                                            <DatePicker
                                                name="appointmentsEnd"
                                                selected={values.appointmentsEnd}
                                                onChange={date => setFieldValue('appointmentsEnd', date)}
                                                minTime={values.appointmentsStart}
                                                timeIntervals={30}
                                                showTimeSelectOnly
                                                dateFormat="p"
                                            />
                                        </LabelInput>
                                    </>
                                ) : (
                                    <>
                                        <LabelInput>
                                            <label htmlFor="neoplasia">Neoplasia</label>
                                            <Field name="neoplasia" />
                                        </LabelInput>
                                        <LabelInput>
                                            <label htmlFor="chartNumber">Número do prontuário</label>
                                            <Field name="chartNumber" />
                                        </LabelInput>
                                    </>
                                )}
                            </FieldGroup>

                            <FieldGroup>
                                <LabelInput>
                                    <label htmlFor="city">Cidade</label>
                                    <Field name="city" />
                                </LabelInput>
                                <LabelInput>
                                    <label htmlFor="phoneNumber">Telefone</label>
                                    <Field name="phoneNumber" />
                                </LabelInput>
                            </FieldGroup>

                            <FieldGroup>
                                <LabelInput>
                                    <label htmlFor="birthDate">Data de nascimento</label>
                                    <DatePicker
                                        name="birthDate"
                                        selected={values.birthDate}
                                        onChange={date => setFieldValue('birthDate', date)}
                                    />
                                </LabelInput>

                                <LabelInput>
                                    <label htmlFor="doctorCheck">Usuário é um médico?</label>
                                    <input
                                        id="doctorCheck"
                                        type="checkbox"
                                        onChange={e => setIsDoctor(e.target.checked)}
                                    />
                                </LabelInput>
                            </FieldGroup>

                            <button type="submit">Cadastrar</button>
                        </RegisterForm>
                    )}
                </Formik>
            </Styling>
        </>
    );
};

export default Register;
