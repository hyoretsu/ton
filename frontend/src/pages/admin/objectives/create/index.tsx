import { Input } from '@hyoretsu/react-components';
import { Field, Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import api from '@api';

import { FormBody, FormWrapper, LabelInput } from '@styles/admin/patient/register';

interface FormFields {
    goal: number;
    isDaily: boolean;
    time?: number;
    title: string;
}

const CreateObjectives: React.FC = () => {
    const { back, push } = useRouter();

    const createObjective = async ({ time, ...values }: FormFields): Promise<void> => {
        let filteredFields: FormFields = values;

        if (time) filteredFields = { ...values, time };

        await api.post('/objectives', values);

        push('/admin/objectives');
    };

    return (
        <>
            <NextSeo title="Criar missões" nofollow noindex />
            <div>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>
                <Formik
                    initialValues={{
                        goal: 1,
                        isDaily: false,
                        time: 0,
                        title: '',
                    }}
                    onSubmit={createObjective}
                    validationSchema={yup.object().shape({
                        goal: yup.number().required(),
                        isDaily: yup.boolean().required(),
                        time: yup.number(),
                        title: yup.string().required(),
                    })}
                >
                    {({ setFieldValue, values }) => (
                        <FormWrapper>
                            <FormBody>
                                <LabelInput>
                                    <label htmlFor="title">Título</label>
                                    <Field name="title" />
                                </LabelInput>

                                <LabelInput>
                                    <label htmlFor="goal">Vezes</label>
                                    <Input
                                        name="goal"
                                        type="number"
                                        value={values.goal}
                                        min={1}
                                        onChange={e => setFieldValue('goal', e.target.value)}
                                    />
                                </LabelInput>

                                <LabelInput>
                                    <label htmlFor="time">Duração</label>
                                    <Field name="time" />
                                </LabelInput>

                                <LabelInput>
                                    <label htmlFor="isDaily">Repete todo dia?</label>
                                    <Field name="isDaily" type="checkbox" />
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

export default CreateObjectives;
