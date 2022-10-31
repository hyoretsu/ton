import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import BottomBar from '@components/BottomBar';
import Button from '@components/Button';
import Modal from '@components/Modal';
import OpacityFilter from '@components/OpacityFilter';
import { useAuth } from '@contexts/auth';

import api from '@api';

import { AppointmentButton, AppointmentTimes, Container } from '@styles/Appointments';
import { Title } from '@styles/Personal';

const Appointments: React.FC = () => {
    const { user } = useAuth();
    const { goBack } = useNavigation();

    const [date, setDate] = useState(new Date());
    const [times, setTimes] = useState<Date[]>([]);
    const [selectedTime, selectTime] = useState<Date>();
    const [confirmationModalVisible, showConfirmationModal] = useState(false);
    const [datePickerVisible, showDatePicker] = useState(false);

    useEffect(() => {
        setTimes([]);

        if (Math.sign(differenceInCalendarDays(date, new Date())) <= 0) return;

        for (let hours = 8; hours < 14; hours += 0.5) {
            const newTime = new Date(date);
            newTime.setHours(Math.floor(hours), (hours * 60) % 60);
            setTimes(old => [...old, newTime]);
        }
    }, [date]);

    const datePickerOnChange = (event: DateTimePickerEvent, selectedDate: Date | undefined): void => {
        showDatePicker(false);

        selectedDate && setDate(selectedDate);
    };

    const markAppointment = async (): Promise<void> => {
        await api.post('/appointments', {
            doctorId: user.doctorId,
            time: selectedTime,
        });

        showConfirmationModal(true);
    };

    return (
        <>
            <Container>
                <Title>Marcar consulta</Title>
                <AppointmentButton background="#a3bee9" onPress={() => showDatePicker(true)}>
                    {format(date, 'dd/MM')}
                </AppointmentButton>
                <Text style={{ fontSize: 18 }}>às</Text>
                <AppointmentTimes>
                    {times.map((time, index) => (
                        <AppointmentButton
                            key={index}
                            background="#a3bee9"
                            {...(selectedTime === time && { background: '#c4d3f2', border: '#a3bee9' })}
                            onPress={() => selectTime(time)}
                            style={{ marginBottom: 8, marginRight: 8 }}
                        >
                            {format(time, 'HH:mm')}
                        </AppointmentButton>
                    ))}
                </AppointmentTimes>

                {datePickerVisible && <DateTimePicker mode="date" onChange={datePickerOnChange} value={date} />}

                <Button onPress={markAppointment}>Agendar</Button>
            </Container>

            <BottomBar />

            {confirmationModalVisible && (
                <OpacityFilter>
                    <Modal buttonText="Certo" onConfirm={goBack}>
                        Agendamento marcado com sucesso!
                    </Modal>
                </OpacityFilter>
            )}
        </>
    );
};

export default Appointments;
