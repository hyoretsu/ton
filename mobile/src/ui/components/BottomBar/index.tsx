import { SOCKET_URL } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '@context/auth';
import { useInfo } from '@context/info';

import Chat from 'assets/chat.svg';
import Diary from 'assets/diary.svg';
import Educational from 'assets/educational.svg';
import Home from 'assets/home.svg';
import MinLogoWhite from 'assets/minLogoWhite.svg';

import { Button, ButtonNotification, ButtonText, Container, MiddleButtonView } from './styles';

const BottomBar: React.FC = () => {
    const { user } = useAuth();
    const { newMessage, setNewMessage } = useInfo();
    const { navigate } = useNavigation();
    const route = useRoute();

    const [socket, setSocket] = useState<Socket>(null as unknown as Socket);

    const onChat = route.name === 'Chat';
    const onDiary = route.name === 'Diary';
    const onEducational = route.name === 'Educational';
    const onHome = route.name === 'Home' || route.name === 'Profile';

    const iconSize = 11 * vw;

    useEffect(() => {
        setSocket(io(SOCKET_URL));
    }, []);

    useEffect(() => {
        if (!socket || !user) return () => {};

        socket.on(`chat:${user.id}`, async () => {
            setNewMessage(true);
        });

        return () => socket.removeAllListeners();
    }, [route, setNewMessage, socket, user]);

    return (
        <Container>
            <Button onPress={() => navigate('Home')}>
                <Home
                    height={iconSize}
                    width={iconSize}
                    color={onHome ? mainTheme.colors.purple : mainTheme.colors.gray}
                />

                <ButtonText isSelected={!!onHome}>Início</ButtonText>
            </Button>

            <Button onPress={() => navigate('Diary')}>
                <Diary
                    height={iconSize}
                    width={iconSize}
                    color={onDiary ? mainTheme.colors.purple : mainTheme.colors.gray}
                />

                <ButtonText isSelected={onDiary}>Diário</ButtonText>
            </Button>

            <MiddleButtonView>
                <Button
                    onPress={() => navigate('Checkup')}
                    style={{
                        backgroundColor: mainTheme.colors.purple,
                        borderRadius: 7 * vw,
                        marginTop: -2.8 * vh,
                        paddingVertical: 4.7 * vh,
                        width: '100%',
                    }}
                >
                    <MinLogoWhite height={3 * vh} width={9 * vw} style={{ marginTop: 0.9 * vh }} />
                </Button>
                <ButtonText style={{ color: mainTheme.colors.purple, marginBottom: 1 * vh, marginTop: 0.5 * vh }}>
                    Exame
                </ButtonText>
            </MiddleButtonView>

            <Button onPress={() => navigate('Chat')}>
                <Chat
                    height={iconSize * 1.3}
                    width={iconSize * 1.3}
                    color={onChat ? mainTheme.colors.purple : mainTheme.colors.gray}
                />
                {newMessage && route.name !== 'Chat' && <ButtonNotification />}

                <ButtonText isSelected={onChat} style={{ marginBottom: 1.6 * vh, marginTop: 0 }}>
                    Chat
                </ButtonText>
            </Button>

            <Button onPress={() => navigate('Educational')}>
                <Educational
                    height={iconSize}
                    width={iconSize}
                    color={onEducational ? mainTheme.colors.purple : mainTheme.colors.gray}
                />

                <ButtonText isSelected={onEducational}>Educação</ButtonText>
            </Button>
        </Container>
    );
};

export default BottomBar;
