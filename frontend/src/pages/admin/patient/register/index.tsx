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

import api from '@api';

import { FormBody, HematologyDiv, LabelInput, RegisterForm, Styling } from '@styles/admin/patient/register';

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

const checkupSteps = [
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
                let chartNumber, hematology, medicine, neoplasia, parentName;
                // @ts-ignore
                // eslint-disable-next-line prefer-const
                ({ chartNumber, hematology, medicine, neoplasia, parentName, ...values } = values);

                await api.post('/users', values);
            } else {
                let appointmentsEnd, appointmentsStart, checkupPhotos;
                // @ts-ignore
                // eslint-disable-next-line prefer-const
                ({ appointmentsEnd, appointmentsStart, checkupPhotos, ...values } = values);

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
                >
                    {({ setFieldValue, values }) => (
                        <RegisterForm>
                            <FormBody>
                                <LabelInput>
                                    <label htmlFor="name">Nome do paciente</label>
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
                                                onChange={e => setFieldValue('appointmentsStart', e.target.value)}
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
                                                onChange={e => setFieldValue('appointmentsEnd', e.target.value)}
                                            >
                                                {range(Number(values.appointmentsStart) + 0.5, 24 + 0.5, 0.5).map(
                                                    (number, index) => {
                                                        const newDate = new Date();

                                                        return (
                                                            <option key={index}>
                                                                {format(
                                                                    new Date(
                                                                        newDate.setHours(
                                                                            Math.floor(number / 1),
                                                                            (number % 1) * 60,
                                                                        ),
                                                                    ),
                                                                    'HH:mm',
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
                                </LabelInput>

                                <LabelInput>
                                    <label htmlFor="birthDate">Data de nascimento</label>
                                    <DatePicker
                                        name="birthDate"
                                        onChange={(date: Date) => setFieldValue('birthDate', date)}
                                        value={values.birthDate}
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

                                {!isDoctor && (
                                    <>
                                        {checkupSteps.map((step, index) => (
                                            <LabelInput key={index}>
                                                <label htmlFor={`step-${index}`}>{step}</label>
                                                <input
                                                    id={`step-${index}`}
                                                    type="file"
                                                    onChange={e =>
                                                        setFieldValue(
                                                            `checkupPhotos[${step}]`,
                                                            (e.target.files || [])[0],
                                                        )
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
                                                    onChange={e =>
                                                        setFieldValue('hematology.platelets', e.target.value)
                                                    }
                                                />
                                            </LabelInput>
                                            <LabelInput>
                                                <label htmlFor="leukocytes">Leucócitos</label>
                                                <input
                                                    id="leukocytes"
                                                    value={values.hematology.leukocytes}
                                                    onChange={e =>
                                                        setFieldValue('hematology.leukocytes', e.target.value)
                                                    }
                                                />
                                            </LabelInput>
                                            <LabelInput>
                                                <label htmlFor="neutrophils">Neutrófilos</label>
                                                <input
                                                    id="neutrophils"
                                                    value={values.hematology.neutrophils}
                                                    onChange={e =>
                                                        setFieldValue('hematology.neutrophils', e.target.value)
                                                    }
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
                                                onChange={(date: Date) => setFieldValue('medicineEnd', date)}
                                                value={values.medicineEnd}
                                            />
                                        </LabelInput>
                                    </>
                                )}
                            </FormBody>

                            <button type="submit" style={{ margin: '0 auto' }}>
                                Cadastrar
                            </button>
                        </RegisterForm>
                    )}
                </Formik>
            </Styling>
        </>
    );
};

export default Register;
