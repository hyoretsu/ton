import { useNavigation } from '@react-navigation/native';
import { vh, vw } from '@units/viewport';
import { Appointment } from 'backend';
import { format, isAfter } from 'date-fns';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import BottomBar from '@components/BottomBar';
import ObjectivesList from '@components/ObjectivesList';
import PatientPhoto from '@components/PatientPhoto';
import { useAuth } from '@context/auth';

import api from '@api';

import {
    AppointmentDate,
    AppointmentInfo,
    AppointmentText,
    AppointmentView,
    AppointmentViewMarker,
    AppointmentViewMarkerCircle,
    Container,
    PatientGreeting,
    PatientInfo,
    PatientName,
} from '@styles/Home';

const Home: React.FC = () => {
    const { user } = useAuth();
    const { navigate } = useNavigation();

    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/appointments');

            setAppointments(data.filter((appointment: Appointment) => isAfter(new Date(appointment.time), new Date())));
        };

        execute();
    }, []);

    return (
        <>
            <Container>
                <PatientInfo>
                    <View>
                        <PatientGreeting>Oi</PatientGreeting>
                        <PatientName>{user.name}</PatientName>
                    </View>

                    <PatientPhoto size={10 * vw} onPress={() => navigate('Profile')} />
                </PatientInfo>

                <AppointmentView>
                    <AppointmentViewMarker>
                        <AppointmentViewMarkerCircle />
                    </AppointmentViewMarker>
                    <AppointmentInfo>
                        <AppointmentText>Sua próxima consulta é para o dia:</AppointmentText>
                        <AppointmentDate>
                            {appointments[0]?.time
                                ? format(new Date(appointments[0].time), 'dd/MM/yyyy')
                                : '__ /__ /____'}
                        </AppointmentDate>
                    </AppointmentInfo>
                </AppointmentView>

                <ObjectivesList style={{ marginTop: 3 * vh }} />
            </Container>
            <BottomBar />
        </>
    );
};

export default Home;
