import { AxiosError } from 'axios';
import { Checkup } from 'backend';
import { differenceInMinutes, format, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { StatusBar, Text } from 'react-native';

import BottomBar from '@components/BottomBar';
import Header from '@components/Header';
import Modal from '@components/Modal';
import { useStorage } from '@context/storage';

import api from '@api';

import { Container, ContentButton, ContentTitle } from '@styles/History';
import mainTheme from '@theme';

const History: React.FC = () => {
    const [sentCheckups, setSentCheckups] = useState<boolean[]>([]);
    const [modalText, setModalText] = useState('');
    const [modalVisible, showModal] = useState(false);
    const { checkupHistory } = useStorage();

    useEffect(() => {
        const execute = async (): Promise<void> => {
            const { data: checkups } = await api.get<Checkup[]>('/checkup');

            setSentCheckups(
                checkupHistory.map(savedCheckup => {
                    let checkupWasSent = false;

                    for (const checkup of checkups) {
                        if (
                            isSameDay(new Date(savedCheckup.date), new Date(checkup.createdAt)) &&
                            Math.abs(differenceInMinutes(new Date(savedCheckup.date), new Date(checkup.createdAt))) <= 1
                        ) {
                            checkupWasSent = true;
                            break;
                        }
                    }

                    return checkupWasSent;
                }),
            );
        };

        execute();
    }, [checkupHistory]);

    const sendCheckup = async (index: number): Promise<void> => {
        const formData = new FormData();

        const checkup = checkupHistory[index];

        Object.entries(checkup.photos).forEach(([key, uri]) =>
            formData.append(key, {
                uri,
                type: 'image/jpeg',
                name: (uri.match(/(?:cache|Caches)\/(?:.*\/)?Camera\/(.*.jpg)/) as string[])[1],
            }),
        );
        formData.append('answers', JSON.stringify(checkup.answers));
        formData.append('createdAt', checkup.date);

        try {
            await api.post('/checkup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 120000,
            });
        } catch (e) {
            const error = e as AxiosError;

            // @ts-ignore
            setModalText(`${error.code}\n${error.message}\n\n${error.response.data.message}`);
            showModal(true);

            return;
        }

        setModalText('O exame foi enviado com sucesso');

        showModal(true);

        const newSentCheckups = [...sentCheckups];
        newSentCheckups[index] = true;
        setSentCheckups(newSentCheckups);
    };

    return (
        <>
            <StatusBar backgroundColor={mainTheme.colors.purple} />

            <Header>Histórico</Header>

            <Container showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 0 }}>
                {checkupHistory.map(({ date }, index) => {
                    return (
                        <ContentButton key={date} onPress={() => sendCheckup(index)}>
                            <ContentTitle>
                                Exame do dia {format(new Date(date), 'dd/MM/yyyy')}, às{' '}
                                {format(new Date(date), 'HH:mm')}
                            </ContentTitle>

                            {sentCheckups[index] && <Text style={{ color: '#ddd' }}>Enviado</Text>}
                        </ContentButton>
                    );
                })}
            </Container>

            <BottomBar />

            {modalVisible && (
                <Modal
                    buttonBackground={mainTheme.colors.purple}
                    buttonBold
                    buttonText="Fechar"
                    buttonTextColor="#fff"
                    onConfirm={() => showModal(false)}
                    width={80}
                >
                    {modalText}
                </Modal>
            )}
        </>
    );
};

export default History;
