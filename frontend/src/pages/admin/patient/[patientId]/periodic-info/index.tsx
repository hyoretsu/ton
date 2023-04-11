import { Formik } from 'formik';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import DatePicker from 'react-date-picker';
import { FiPlusCircle } from 'react-icons/fi';

import api from '@api';

import { PeriodicInfoForm, Styling } from '@styles/admin/patient/[patientId]/periodic-info';

interface FormFields {
    hematology: Record<string, string>;
    medicine: Array<{
        name: string;
        dosage: string;
    }>;
    medicineEnd: Date;
}

const PeriodicInfo: React.FC = () => {
    const {
        back,
        query: { patientId },
    } = useRouter();

    const updatePeriodicInfo = async (values: FormFields): Promise<void> => {
        if (
            values.medicine[values.medicine.length - 1].name === '' ||
            values.medicine[values.medicine.length - 1].dosage === ''
        ) {
            values = { ...values, medicine: values.medicine.slice(1, -1) };
        }

        if (values.medicine.length < 1) return;

        await api.post('/users/periodic_info', {
            patientId,
            ...values,
        });

        back();
    };

    return (
        <>
            <NextSeo title="Informações Periódicas" nofollow noindex />
            <Styling>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>

                <Formik
                    initialValues={{
                        hematology: { redCells: '', platelets: '', leukocytes: '', neutrophils: '' },
                        medicine: [{ name: '', dosage: '' }],
                        medicineEnd: new Date(),
                    }}
                    onSubmit={updatePeriodicInfo}
                >
                    {({ setFieldValue, values }) => (
                        <PeriodicInfoForm>
                            <div>
                                <label htmlFor="redCells">Hemácias</label>
                                <input
                                    id="redCells"
                                    value={values.hematology.redCells}
                                    onChange={e => setFieldValue('hematology.redCells', Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label htmlFor="platelets">Plaquetas</label>
                                <input
                                    id="platelets"
                                    value={values.hematology.platelets}
                                    onChange={e => setFieldValue('hematology.platelets', Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label htmlFor="leukocytes">Leucócitos</label>
                                <input
                                    id="leukocytes"
                                    value={values.hematology.leukocytes}
                                    onChange={e => setFieldValue('hematology.leukocytes', Number(e.target.value))}
                                />
                            </div>
                            <div>
                                <label htmlFor="neutrophils">Neutrófilos</label>
                                <input
                                    id="neutrophils"
                                    value={values.hematology.neutrophils}
                                    onChange={e => setFieldValue('hematology.neutrophils', Number(e.target.value))}
                                />
                            </div>

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
                                                        setFieldValue(`medicine[${index}].name`, e.target.value)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={medicine.dosage}
                                                    onChange={e =>
                                                        setFieldValue(`medicine[${index}].dosage`, e.target.value)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button type="button" onClick={() => setFieldValue('medicine', [...values.medicine, {}])}>
                                <FiPlusCircle size="1.5vw" style={{ alignSelf: 'center' }} />
                            </button>

                            <label htmlFor="medicineEnd">Término do regime quimioterápico</label>
                            <DatePicker
                                name="medicineEnd"
                                onChange={(date: Date) => setFieldValue('medicineEnd', date)}
                                value={values.medicineEnd}
                            />

                            <button type="submit" style={{ marginTop: '2vh' }}>
                                Atualizar
                            </button>
                        </PeriodicInfoForm>
                    )}
                </Formik>
            </Styling>
        </>
    );
};

export default PeriodicInfo;
