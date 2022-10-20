import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from 'backend';
import { RouteParams } from 'data/@types/navigation';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Feather';
import { io, Socket } from 'socket.io-client';

import BottomBar from '@components/BottomBar';
import { useAuth } from '@contexts/auth';

import api from '@api';

import {
    Container,
    MessageView,
    MessageTime,
    MessageText,
    UserInput,
    InputView,
    MessageSend,
    DateSection,
    DateSectionMark,
    DateSectionText,
    MessageSpeaker,
} from '@styles/Chat';

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
        AsyncStorage.setItem('@eOdontologia:messages', JSON.stringify(data));
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
            const storedMessages = await AsyncStorage.getItem('@eOdontologia:messages');
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }

            await updateMessages();
            setLoading(false);

            setSocket(io('http://192.168.0.11:3332'));

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
                <Container>
                    <InputView>
                        <UserInput onChangeText={setCurrentMessage} value={currentMessage} />
                        <MessageSend onPress={() => sendMessage(currentMessage)}>
                            <Icon name="send" size={28} style={{ left: -1, top: 1 }} />
                        </MessageSend>
                    </InputView>

                    <FlatList
                        data={messages}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: message, index }) => (
                            <>
                                <MessageView
                                    style={[
                                        index === messages.length - 1 && { marginBottom: 0 },
                                        message.senderId !== user.id
                                            ? {
                                                  marginLeft: 16,
                                                  marginRight: 'auto',
                                              }
                                            : {
                                                  marginLeft: 'auto',
                                                  marginRight: 16,
                                              },
                                    ]}
                                >
                                    <View>
                                        <MessageText>{message.body}</MessageText>
                                        <MessageTime>{format(new Date(message.createdAt), 'HH:mm')}</MessageTime>
                                    </View>
                                    {message.senderId !== user.id && (
                                        <MessageSpeaker onPress={() => Tts.speak(message.body)} />
                                    )}
                                </MessageView>
                                {Object.keys(dates).includes(message.id) && (
                                    <DateSection>
                                        <DateSectionMark />
                                        <DateSectionText>{dates[message.id]}</DateSectionText>
                                    </DateSection>
                                )}
                            </>
                        )}
                        inverted
                        contentContainerStyle={{ flexDirection: 'column-reverse', paddingBottom: 12 }}
                    />
                </Container>
            )}

            <BottomBar />
        </>
    );
};

export default Chat;
