import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAuth } from '@context/auth';
import { useInfo } from '@context/info';
import { vh, vw } from '@utils';

import mainTheme from '@theme';

import Chat from '@assets/chat.svg';
import Diary from '@assets/diary.svg';
import Educational from '@assets/educational.svg';
import Home from '@assets/home.svg';
import MinLogoWhite from '@assets/minLogoWhite.svg';

import { Button, ButtonNotification, ButtonText, Container, MiddleButtonView } from './styles';

export default function BottomBar() {
    const { user } = useAuth();
    const { newMessage, setNewMessage } = useInfo();
    const pathname = usePathname();

    const [socket, setSocket] = useState<Socket>(null as unknown as Socket);

    const onChat = pathname === '/chat';
    const onDiary = pathname === '/diary';
    const onEducational = pathname === '/educational';
    const onHome = pathname === '/' || pathname === '/profile';

    const iconSize = 11 * vw;

    useEffect(() => {
        setSocket(io(process.env.SOCKET_URL!));
    }, []);

    useEffect(() => {
        if (!socket || !user) return () => {};

        socket.on(`chat:${user.id}`, async () => {
            setNewMessage(true);
        });

        return () => socket.removeAllListeners();
    }, [setNewMessage, socket, user]);

    return (
        <Container>
            <Button onPress={() => router.push('/')}>
                <Home
                    height={iconSize}
                    width={iconSize}
                    color={onHome ? mainTheme.colors.purple : mainTheme.colors.gray}
                />

                <ButtonText isSelected={!!onHome}>Início</ButtonText>
            </Button>

            <Button onPress={() => router.push('/diary')}>
                <Diary
                    height={iconSize}
                    width={iconSize}
                    color={onDiary ? mainTheme.colors.purple : mainTheme.colors.gray}
                />

                <ButtonText isSelected={onDiary}>Diário</ButtonText>
            </Button>

            <MiddleButtonView>
                <Button
                    onPress={() => router.push('/checkup')}
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

            <Button onPress={() => router.push('/chat')}>
                <Chat
                    height={iconSize * 1.3}
                    width={iconSize * 1.3}
                    color={onChat ? mainTheme.colors.purple : mainTheme.colors.gray}
                />
                {newMessage && pathname !== '/chat' && <ButtonNotification />}

                <ButtonText isSelected={onChat} style={{ marginBottom: 1.6 * vh, marginTop: 0 }}>
                    Chat
                </ButtonText>
            </Button>

            <Button onPress={() => router.push('/educational')}>
                <Educational
                    height={iconSize}
                    width={iconSize}
                    color={onEducational ? mainTheme.colors.purple : mainTheme.colors.gray}
                />

                <ButtonText isSelected={onEducational}>Educação</ButtonText>
            </Button>
        </Container>
    );
}
