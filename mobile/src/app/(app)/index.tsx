import { Feather as Icon } from '@expo/vector-icons';
import { Appointment } from 'backend';
import { format, isAfter } from 'date-fns';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import BottomBar from '@components/BottomBar';
import ObjectivesList from '@components/ObjectivesList';
import PatientPhoto from '@components/PatientPhoto';
import { useAuth } from '@context/auth';
import { vh, vw } from '@utils';

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
} from './styles';

export default function Home() {
    const { user } = useAuth();
    const { navigate } = useRouter();

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

                    <PatientPhoto size={10 * vw} onPress={() => navigate('/profile')} />
                </PatientInfo>

                <AppointmentView>
                    <AppointmentViewMarker>
                        <AppointmentViewMarkerCircle onPress={() => navigate('/appointments')}>
                            <Icon name="calendar" size={7 * vw} color="#fff" />
                        </AppointmentViewMarkerCircle>
                    </AppointmentViewMarker>
                    <AppointmentInfo>
                        <AppointmentText>Sua próxima consulta{'\n'}odontológica é dia:</AppointmentText>
                        <AppointmentDate>
                            {appointments[0]?.time
                                ? format(new Date(appointments[0].time), 'dd/MM/yyyy')
                                : '__ /__ /____'}
                        </AppointmentDate>
                    </AppointmentInfo>
                </AppointmentView>
            </Container>

            <ObjectivesList style={{ marginBottom: 'auto', marginHorizontal: 11 * vw, marginTop: 3 * vh }} />

            <BottomBar />
        </>
    );
}
