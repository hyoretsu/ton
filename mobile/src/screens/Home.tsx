import { useNavigation } from '@react-navigation/native';
import { vw } from '@units/viewport';
import { Appointment } from 'backend';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';
import PatientPhoto from '@components/PatientPhoto';
import { useAuth } from '@contexts/auth';
import { useInfo } from '@contexts/info';

import api from '@api';

import {
    AppointmentDate,
    AppointmentInfo,
    AppointmentText,
    AppointmentView,
    AppointmentViewMarker,
    AppointmentViewMarkerCircle,
    Container,
    ObjectiveCheck,
    ObjectiveLink,
    ObjectiveTitle,
    ObjectiveView,
    ObjectivesText,
    PatientGreeting,
    PatientInfo,
    PatientName,
} from '@styles/Home';

const Home: React.FC = () => {
    const { user } = useAuth();
    const { navigate } = useNavigation();
    const { objectives, progress } = useInfo();

    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data } = await api.get('/appointments');

            setAppointments(data);
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

                <ObjectivesText>Metas do dia:</ObjectivesText>
                {objectives.map(objective => {
                    const completed = (progress[objective.id] || 0) === objective.goal;

                    return (
                        <RectButton key={objective.id} onPress={() => navigate('Diary')}>
                            <ObjectiveView completed={completed}>
                                <ObjectiveTitle completed={completed}>{objective.title}</ObjectiveTitle>

                                {/* @ts-ignore */}
                                {completed ? <ObjectiveCheck /> : <ObjectiveLink>{'>'}</ObjectiveLink>}
                            </ObjectiveView>
                        </RectButton>
                    );
                })}
            </Container>
            <BottomBar />
        </>
    );
};

export default Home;