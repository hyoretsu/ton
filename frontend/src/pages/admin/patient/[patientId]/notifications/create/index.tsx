import { TimePicker } from '@mui/x-date-pickers';
import { Objective } from 'backend';
import { Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import * as yup from 'yup';

import api from '@api';

import { FormBody, FormWrapper, LabelInput } from '@styles/admin/patient/register';

interface FormFields {
    objectiveId: string;
    times: Date[];
}

const Create: React.FC = () => {
    const {
        back,
        query: { patientId },
    } = useRouter();

    const [objectives, setObjectives] = useState<Objective[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/objectives');

            setObjectives(data);
        };

        execute();
    }, []);

    const createNotifications = async ({ objectiveId, times }: FormFields): Promise<void> => {
        await api.post(`/objectives/${objectiveId}/notifications`, { patientId, times });

        back();
    };

    return (
        <>
            <NextSeo title="Criar notificação" nofollow noindex />
            <div>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>
                <Formik
                    initialValues={{
                        objectiveId: '',
                        times: [new Date()],
                    }}
                    onSubmit={createNotifications}
                    validationSchema={yup.object().shape({
                        objectiveId: yup.string().uuid().required(),
                        times: yup.array().of(yup.date()).required(),
                    })}
                >
                    {({ setFieldValue, values }) => (
                        <FormWrapper>
                            <FormBody>
                                <LabelInput>
                                    <span>Missão</span>
                                    <select
                                        defaultValue=""
                                        onChange={e => setFieldValue('objectiveId', e.target.value)}
                                    >
                                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                                        <option value="" hidden />
                                        {objectives.map(objective => (
                                            <option key={objective.id} value={objective.id}>
                                                {objective.title}
                                            </option>
                                        ))}
                                    </select>
                                </LabelInput>

                                <LabelInput>
                                    <span>Horários</span>
                                    <table>
                                        <tbody>
                                            {values.times.map((time, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <TimePicker
                                                            value={time}
                                                            ampm={false}
                                                            // timeSteps={{ minutes: 1 }}
                                                            onChange={date => setFieldValue(`times[${index}]`, date)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            type="button"
                                            onClick={() => setFieldValue('times', values.times.slice(0, -1))}
                                        >
                                            <FiMinusCircle size="1.5vw" style={{ alignSelf: 'center' }} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFieldValue('times', [...values.times, new Date()])}
                                        >
                                            <FiPlusCircle size="1.5vw" style={{ alignSelf: 'center' }} />
                                        </button>
                                    </div>
                                </LabelInput>
                            </FormBody>

                            <button type="submit" style={{ margin: '3vh auto', padding: '1vh 1vw' }}>
                                Criar
                            </button>
                        </FormWrapper>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Create;
