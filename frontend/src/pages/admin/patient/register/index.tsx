import { Modal } from '@hyoretsu/react-components';
import { range } from '@hyoretsu/utils';
import { useAuth } from 'data/contexts/auth';
import { format } from 'date-fns';
import { Field, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { FiPlusCircle } from 'react-icons/fi';
import * as yup from 'yup';

import api from '@api';

import { ErrorText, FormBody, FormWrapper, HematologyDiv, LabelInput } from '@styles/admin/patient/register';

interface FormFields {
    appointmentsEnd: number;
    appointmentsStart: number;
    birthDate: Date;
    chartNumber: string;
    checkupPhotos: Record<string, File>;
    city: string;
    email: string;
    hematology: Record<string, string>;
    medicine: Array<{
        name: string;
        dosage: string;
    }>;
    medicineEnd: Date;
    name: string;
    neoplasia: string;
    password: string;
    parentName: string;
    phoneNumber: string;
}

export const checkupSteps = [
    'Sorriso aparente',
    'Por dentro da bochecha direita',
    'Por dentro da bochecha esquerda',
    'Boca aberta com língua para frente',
    'Boca aberta com língua para direita',
    'Boca aberta com língua para esquerda',
    'Debaixo da língua',
    'Céu da boca',
];

const Register: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [error, setError] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);

    const finishRegister = async (values: FormFields): Promise<void> => {
        try {
            if (isDoctor) {
                let chartNumber, checkupPhotos, hematology, medicine, medicineEnd, neoplasia, parentName, treatment;
                // @ts-ignore
                // eslint-disable-next-line prefer-const, prettier/prettier
                ({ chartNumber, checkupPhotos, hematology, medicine, medicineEnd, neoplasia, parentName, treatment, ...values } = values);

                await api.post('/users', values);
            } else {
                let appointmentsEnd, appointmentsStart, checkupPhotos, hematology, medicine, medicineEnd;
                // @ts-ignore
                // eslint-disable-next-line prefer-const
                ({ appointmentsEnd, appointmentsStart, checkupPhotos, hematology, medicine, medicineEnd, ...values } =
                    values);

                if (Object.entries(checkupPhotos).length !== 8) {
                    setError('Você precisa enviar todas as 8 fotos para cadastrar um paciente.');
                    return;
                }

                const { data: patient } = await api.post('/users', { ...values, doctorId: user?.id });

                const formData = new FormData();
                Object.entries(checkupPhotos).forEach(([step, photo]) => {
                    formData.append(step, photo);
                });
                formData.append('patientId', patient.id);

                await api.post('/checkup', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                await api.post('/users/periodic_info', {
                    patientId: patient.id,
                    hematology,
                    medicine,
                    medicineEnd,
                });
            }

            router.push('/admin/dashboard');
        } catch ({ response }) {
            setError(response.data.validation?.body.message || response.data.message);
        }
    };

    return (
        <>
            <NextSeo nofollow noindex />
            {error && <Modal onConfirm={() => setError('')}>{error}</Modal>}
            <Formik
                initialValues={{
                    appointmentsEnd: 24,
                    appointmentsStart: 0,
                    birthDate: new Date(),
                    chartNumber: '',
                    checkupPhotos: {},
                    city: '',
                    email: '',
                    hematology: { redCells: '', platelets: '', leukocytes: '', neutrophils: '' },
                    medicine: [{ name: '', dosage: '' }],
                    medicineEnd: new Date(),
                    name: '',
                    neoplasia: '',
                    password: '',
                    parentName: '',
                    phoneNumber: '',
                }}
                onSubmit={finishRegister}
                validationSchema={yup.object().shape({
                    phoneNumber: yup
                        .string()
                        .matches(
                            /\d{2}9?\d{8}/,
                            'Por favor, inclua o DDD e o 9 adicional no começo do número (apenas dígitos)',
                        )
                        .required('É necessário um nº de telefone'),
                })}
            >
                {({ errors, setFieldValue, touched, values }) => (
                    <FormWrapper>
                        <FormBody>
                            <LabelInput>
                                <label htmlFor="name">Nome do {isDoctor ? 'médico' : 'paciente'}</label>
                                <Field name="name" />
                            </LabelInput>
                            {!isDoctor ? (
                                <LabelInput>
                                    <label htmlFor="parentName">Nome do responsável</label>
                                    <Field name="parentName" />
                                </LabelInput>
                            ) : (
                                <div />
                            )}

                            <LabelInput>
                                <label htmlFor="email">Email</label>
                                <Field name="email" />
                            </LabelInput>
                            <LabelInput>
                                <label htmlFor="password">Senha</label>
                                <Field name="password" type="password" />
                            </LabelInput>

                            {isDoctor ? (
                                <>
                                    <LabelInput>
                                        <label htmlFor="appointmentsStart">Início do atendimento</label>
                                        <select
                                            title="appointmentsStart"
                                            onChange={e => setFieldValue('appointmentsStart', Number(e.target.value))}
                                        >
                                            {range(0, 24, 0.5).map((number, index) => {
                                                return (
                                                    <option value={number} key={index}>
                                                        {format(
                                                            new Date(
                                                                new Date().setHours(
                                                                    Math.floor(number / 1),
                                                                    (number % 1) * 60,
                                                                ),
                                                            ),
                                                            'H:mm',
                                                        )}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </LabelInput>
                                    <LabelInput>
                                        <label htmlFor="appointmentsEnd">Fim do atendimento</label>
                                        <select
                                            title="appointmentsEnd"
                                            onChange={e => setFieldValue('appointmentsEnd', Number(e.target.value))}
                                        >
                                            {range(Number(values.appointmentsStart) + 0.5, 24 + 0.5, 0.5).map(
                                                (number, index) => {
                                                    return (
                                                        <option value={number} key={index}>
                                                            {format(
                                                                new Date(
                                                                    new Date().setHours(
                                                                        Math.floor(number / 1),
                                                                        (number % 1) * 60,
                                                                    ),
                                                                ),
                                                                'H:mm',
                                                            )}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
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

                            <LabelInput>
                                <label htmlFor="city">Cidade</label>
                                <Field name="city" />
                            </LabelInput>
                            <LabelInput>
                                <label htmlFor="phoneNumber">Telefone</label>
                                <Field name="phoneNumber" />
                                {touched.phoneNumber && errors.phoneNumber && (
                                    <ErrorText>{errors.phoneNumber}</ErrorText>
                                )}
                            </LabelInput>

                            <LabelInput>
                                <label htmlFor="birthDate">Data de nascimento</label>
                                <DatePicker
                                    name="birthDate"
                                    locale="pt-BR"
                                    onChange={value => setFieldValue('birthDate', value)}
                                    value={values.birthDate}
                                />
                            </LabelInput>

                            <LabelInput>
                                <label htmlFor="doctorCheck">Usuário é um médico?</label>
                                <input id="doctorCheck" type="checkbox" onChange={e => setIsDoctor(e.target.checked)} />
                            </LabelInput>

                            {!isDoctor && (
                                <>
                                    {checkupSteps.map((step, index) => (
                                        <LabelInput key={index}>
                                            <label htmlFor={`step-${index}`}>{step}</label>
                                            <input
                                                id={`step-${index}`}
                                                type="file"
                                                onChange={e =>
                                                    setFieldValue(`checkupPhotos[${step}]`, (e.target.files || [])[0])
                                                }
                                            />
                                        </LabelInput>
                                    ))}

                                    <HematologyDiv style={{ marginBottom: 'auto' }}>
                                        <LabelInput>
                                            <label htmlFor="redCells">Hemácias</label>
                                            <input
                                                id="redCells"
                                                value={values.hematology.redCells}
                                                onChange={e => setFieldValue('hematology.redCells', e.target.value)}
                                            />
                                        </LabelInput>
                                        <LabelInput>
                                            <label htmlFor="platelets">Plaquetas</label>
                                            <input
                                                id="platelets"
                                                value={values.hematology.platelets}
                                                onChange={e => setFieldValue('hematology.platelets', e.target.value)}
                                            />
                                        </LabelInput>
                                        <LabelInput>
                                            <label htmlFor="leukocytes">Leucócitos</label>
                                            <input
                                                id="leukocytes"
                                                value={values.hematology.leukocytes}
                                                onChange={e => setFieldValue('hematology.leukocytes', e.target.value)}
                                            />
                                        </LabelInput>
                                        <LabelInput>
                                            <label htmlFor="neutrophils">Neutrófilos</label>
                                            <input
                                                id="neutrophils"
                                                value={values.hematology.neutrophils}
                                                onChange={e => setFieldValue('hematology.neutrophils', e.target.value)}
                                            />
                                        </LabelInput>
                                    </HematologyDiv>

                                    <LabelInput>
                                        <span>Remédios</span>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th>Dosagem</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values.medicine.map((medicine, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={medicine.name}
                                                                onChange={e =>
                                                                    setFieldValue(
                                                                        `medicine[${index}].name`,
                                                                        e.target.value,
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={medicine.dosage}
                                                                onChange={e =>
                                                                    setFieldValue(
                                                                        `medicine[${index}].dosage`,
                                                                        e.target.value,
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <button
                                            type="button"
                                            onClick={() => setFieldValue('medicine', [...values.medicine, {}])}
                                        >
                                            <FiPlusCircle size="1.5vw" style={{ alignSelf: 'center' }} />
                                        </button>
                                    </LabelInput>

                                    <LabelInput>
                                        <label htmlFor="treatment">Tratamento</label>
                                        <Field name="treatment" />
                                    </LabelInput>

                                    <LabelInput>
                                        <label htmlFor="medicineEnd">Término do regime quimioterápico</label>
                                        <DatePicker
                                            name="medicineEnd"
                                            locale="pt-BR"
                                            onChange={date => setFieldValue('medicineEnd', date)}
                                            value={values.medicineEnd}
                                        />
                                    </LabelInput>
                                </>
                            )}
                        </FormBody>

                        <button type="submit" style={{ margin: '0 auto' }}>
                            Cadastrar
                        </button>
                    </FormWrapper>
                )}
            </Formik>
        </>
    );
};

export default Register;
