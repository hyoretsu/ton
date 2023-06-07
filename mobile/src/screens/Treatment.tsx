import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';
import { Medicine } from 'backend';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import BottomBar from '@components/BottomBar';
import Button from '@components/Button';
import ProfileInfoHeader from '@components/ProfileInfoHeader';
import Row from '@components/Row';
import { useAuth } from '@context/auth';

import api from '@api';

import {
    Container,
    MedicineDateDesc,
    MedicineDateDescBig,
    MedicineDateView,
    MedicineDateViewText,
    MedicineDuration,
    MedicineTable,
    MedicineTableHeader,
    MedicineName,
    TreatmentTitle,
    TreatmentView,
    MedicineDosage,
    MedicineList,
} from '@styles/Treatment';

const Treatment: React.FC = () => {
    const { user } = useAuth();

    const [medicine, setMedicine] = useState<Medicine[]>([]);
    const [medicineDate, setMedicineDate] = useState([new Date(), new Date()]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/users/medicine');

            if (data.length === 0) return;

            setMedicine(data[0].medicine);
            setMedicineDate([data[0].createdAt, data[0].endDate]);
        };

        execute();
    }, []);

    return (
        <>
            <Container>
                <ProfileInfoHeader style={{ paddingHorizontal: 6 * vw }}>Tratamento</ProfileInfoHeader>

                {user.treatment && (
                    <>
                        <TreatmentTitle>Tipo de tratamento:</TreatmentTitle>
                        <Button borderRadius={2.5 * vw} padding={[0.5 * vh, 4 * vw]} style={{ alignSelf: 'center' }}>
                            {user.treatment}
                        </Button>
                    </>
                )}

                <TreatmentTitle>Protocolo:</TreatmentTitle>
                <TreatmentView>
                    <MedicineDuration>
                        <View>
                            <MedicineDateDescBig>Duração</MedicineDateDescBig>
                            <MedicineDateDesc>do último tratamento</MedicineDateDesc>
                        </View>

                        <MedicineDateView
                            style={{
                                backgroundColor: mainTheme.colors.purple,
                                marginLeft: 4 * vw,
                            }}
                        >
                            <MedicineDateViewText>Data de início:</MedicineDateViewText>
                            <MedicineDateViewText>
                                {format(new Date(medicineDate[0]), 'dd/M/yyyy')}
                            </MedicineDateViewText>
                        </MedicineDateView>

                        <MedicineDateView
                            style={{
                                backgroundColor: mainTheme.colors.gold,
                                marginLeft: 1 * vw,
                            }}
                        >
                            <MedicineDateViewText>Data de término:</MedicineDateViewText>
                            <MedicineDateViewText>
                                {format(new Date(medicineDate[1]), 'dd/M/yyyy')}
                            </MedicineDateViewText>
                        </MedicineDateView>
                    </MedicineDuration>

                    <MedicineTable>
                        <Row>
                            <MedicineTableHeader
                                style={{
                                    backgroundColor: mainTheme.colors.purple,
                                    paddingLeft: 7 * vw,
                                    paddingRight: 13 * vw,
                                }}
                            >
                                Quimioterápico
                            </MedicineTableHeader>
                            <MedicineTableHeader
                                style={{
                                    backgroundColor: mainTheme.colors.gold,
                                    paddingLeft: 10 * vw,
                                    paddingRight: 10 * vw,
                                    position: 'absolute',
                                    right: 0,
                                }}
                            >
                                Dosagem
                            </MedicineTableHeader>
                        </Row>
                        {medicine.map((item, index) => {
                            const isLast = index === medicine.length - 1;

                            return (
                                <MedicineList key={item.id}>
                                    <MedicineName
                                        style={
                                            isLast && {
                                                borderBottomWidth: 0,
                                                borderBottomLeftRadius: 2 * vw,
                                            }
                                        }
                                    >
                                        {item.name}
                                    </MedicineName>
                                    <MedicineDosage
                                        style={
                                            isLast && {
                                                borderBottomWidth: 0,
                                                borderBottomRightRadius: 2 * vw,
                                            }
                                        }
                                    >
                                        {item.dosage}
                                    </MedicineDosage>
                                </MedicineList>
                            );
                        })}
                    </MedicineTable>
                </TreatmentView>
            </Container>

            <BottomBar />
        </>
    );
};

export default Treatment;
