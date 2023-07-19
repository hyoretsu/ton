import { Form, Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { checkupSteps } from 'pages/admin/patient/register';

import api from '@api';

import { LabelInput } from '@styles/admin/patient/register';

interface FormFields {
    checkupPhotos: Record<string, File>;
}

const Create: React.FC = () => {
    const router = useRouter();

    const finishRegister = async ({ checkupPhotos }: FormFields): Promise<void> => {
        console.log(router.query.patientId);
        if (Object.entries(checkupPhotos).length !== 8) {
            return;
        }

        const formData = new FormData();

        Object.entries(checkupPhotos).forEach(([step, photo]) => {
            formData.append(step, photo);
        });
        formData.append('patientId', router.query.patientId as string);

        await api.post('/checkup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        router.back();
    };

    return (
        <>
            <NextSeo title="Cadastrar exame" />
            <Formik
                initialValues={{
                    checkupPhotos: {},
                }}
                onSubmit={finishRegister}
            >
                {({ setFieldValue }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
                        </div>

                        <button type="submit" style={{ margin: '0 auto' }}>
                            Cadastrar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Create;
