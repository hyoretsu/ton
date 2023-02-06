import AsyncStorage from '@react-native-async-storage/async-storage';
import { vh, vw } from '@units/viewport';
import { Message } from 'backend';
import { RouteParams } from 'data/@types/navigation';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Feather';
import { io, Socket } from 'socket.io-client';
import mainTheme from 'ui/theme/main';

import BackButton from '@components/BackButton';
import BottomBar from '@components/BottomBar';
import { useAuth } from '@contexts/auth';

import api from '@api';

import {
    Container,
    DateSection,
    DateSectionMark,
    DateSectionText,
    Header,
    HeaderTitle,
    InputView,
    LogoTitle,
    MessageView,
    MessageSend,
    MessageSender,
    MessageText,
    MessageTime,
    UserInput,
    MessageTriangle,
    MessageCompleteView,
    InputVoiceView,
    VoiceInput,
} from '@styles/Chat';

import MinLogo from 'assets/minLogo.svg';
import Send from 'assets/send.svg';

interface DateDict {
    [id: string]: string;
}

export interface ChatParams {
    content: string;
}

const Chat: React.FC<RouteParams<ChatParams>> = ({ route }) => {
    const { user } = useAuth();

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [dates, setDates] = useState<DateDict>({});
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<Socket>(null as unknown as Socket);

    const updateMessages = useCallback(async () => {
        const { data } = await api.get('/messages');

        setMessages(data);
        AsyncStorage.setItem('@ton:messages', JSON.stringify(data));
    }, []);

    const sendMessage = useCallback(
        async (message: string) => {
            if (message) {
                await api.post('/messages', {
                    body: message,
                    recipientId: user.doctorId,
                });

                setCurrentMessage('');
            }
        },
        [user],
    );

    // Init
    useEffect(() => {
        const execute = async (): Promise<void> => {
            const storedMessages = await AsyncStorage.getItem('@ton:messages');
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }

            await updateMessages();
            setLoading(false);

            setSocket(io('http://192.168.0.5:3332'));

            if (route.params) {
                sendMessage(route.params.content);
            }

            Tts.getInitStatus().then(
                () => {
                    Tts.setDefaultLanguage('pt-BR');
                    Tts.setDefaultRate(0.5);
                },
                err => {
                    if (err.code === 'no_engine') {
                        Tts.requestInstallEngine();
                    }
                },
            );
        };

        execute();
    }, [route.params, sendMessage, updateMessages]);

    useEffect(() => {
        if (!socket) return;

        socket.on('chat', () => updateMessages());
    }, [socket, updateMessages]);

    useEffect(() => {
        messages.forEach(message => {
            const formattedDate = format(new Date(message.createdAt), 'dd/MM/yyyy');

            setDates(old => {
                if (Object.values(old).includes(formattedDate)) {
                    return old;
                }

                return {
                    ...old,
                    [message.id]: formattedDate,
                };
            });
        });
    }, [messages]);

    return (
        <>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0006" />
                </View>
            ) : (
                <>
                    <StatusBar backgroundColor={mainTheme.colors.purple} />
                    <Container>
                        <InputView>
                            <InputVoiceView>
                                <UserInput
                                    placeholder="Mensagem"
                                    placeholderTextColor={mainTheme.colors.gray}
                                    onChangeText={setCurrentMessage}
                                    value={currentMessage}
                                />
                                <VoiceInput>
                                    <Icon name="mic" size={6 * vw} color={mainTheme.colors.purple} />
                                </VoiceInput>
                            </InputVoiceView>
                            <MessageSend onPress={() => sendMessage(currentMessage)}>
                                <Send height={7 * vw} width={7 * vw} style={{ left: -2, top: 2 }} />
                            </MessageSend>
                        </InputView>

                        <FlatList
                            data={messages}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: message, index }) => {
                                const sentFromUser = message.senderId === user.id;
                                return (
                                    <>
                                        <MessageCompleteView sentFromUser={sentFromUser}>
                                            {!sentFromUser && <MessageTriangle sentFromUser={sentFromUser} />}
                                            <MessageView
                                                sentFromUser={sentFromUser}
                                                style={index === messages.length - 1 && { marginBottom: 0 }}
                                            >
                                                <View>
                                                    <MessageSender sentFromUser={sentFromUser}>
                                                        {message.sender.name}
                                                    </MessageSender>
                                                    <MessageText sentFromUser={sentFromUser}>
                                                        {message.body}
                                                    </MessageText>
                                                    <MessageTime sentFromUser={sentFromUser}>
                                                        {format(new Date(message.createdAt), 'HH:mm')}
                                                    </MessageTime>
                                                </View>
                                                {/* {message.senderId !== user.id && (
                                        <MessageSpeaker onPress={() => Tts.speak(message.body)} />
                                    )} */}
                                            </MessageView>
                                            {sentFromUser && <MessageTriangle sentFromUser={sentFromUser} />}
                                        </MessageCompleteView>
                                        {Object.keys(dates).includes(message.id) && (
                                            <DateSection>
                                                <DateSectionMark />
                                                <DateSectionText>{dates[message.id]}</DateSectionText>
                                            </DateSection>
                                        )}
                                    </>
                                );
                            }}
                            inverted
                            contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 12 }}
                        />
                        <Header>
                            <BackButton size={9 * vw} style={{ left: 3 * vw, position: 'absolute' }} />
                            <LogoTitle>
                                <MinLogo width={9 * vw} style={{ marginTop: 0.8 * vh }} />
                                <HeaderTitle>TON</HeaderTitle>
                            </LogoTitle>
                        </Header>
                    </Container>
                </>
            )}

            <BottomBar />
        </>
    );
};

export default Chat;
