// import { API_URL, SOCKET_URL } from '@env';
import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mainTheme from '@theme';
import { vh, vw } from '@units/viewport';
import { wait } from '@utils';
import { ContentMessage, Message } from 'backend';
import { RouteParams } from 'data/@types/navigation';
import { format } from 'date-fns';
import { ResizeMode, Video } from 'expo-av';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StatusBar, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { io, Socket } from 'socket.io-client';

import BackButton from '@components/BackButton';
import BottomBar from '@components/BottomBar';
import Button from '@components/Button';
import EducationalHeader from '@components/EducationalHeader';
import { useAuth } from '@context/auth';
import { useInfo } from '@context/info';

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
    MessageList,
    AnswerSelection,
    AnswerSelectionBackground,
    AnswerSelectionText,
    AnswerSelectionTitle,
    AnswerSelectionLine,
    MessageSpeaker,
} from '@styles/Chat';

import MinLogo from 'assets/minLogo.svg';
import Send from 'assets/send.svg';

const API_URL = 'https://odontologiadigital.ccs.ufpb.br/ton';
const SOCKET_URL = 'https://odontologiadigital.ccs.ufpb.br';

interface DateDict {
    [id: string]: string;
}

export interface ChatParams {
    content: string;
}

const Chat: React.FC<RouteParams<ChatParams>> = ({ route }) => {
    const { user } = useAuth();
    const { newMessage, setNewMessage } = useInfo();

    const messageListRef = useRef<ScrollView>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [answerSelectionVisible, showAnswerSelection] = useState(false);
    const [currentAnswers, setCurrentAnswers] = useState<ContentMessage[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [dates, setDates] = useState<DateDict>({});
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<Socket>(null as unknown as Socket);
    const [voice, setTtsVoice] = useState('');

    const sendMessage = useCallback(
        async (message: string, sequelId?: string | null) => {
            await api.post('/messages', {
                body: message,
                recipientId: typeof sequelId === 'undefined' ? user.doctorId : null,
                sequelId,
            });

            setCurrentMessage('');
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

            const { data } = await api.get('/messages');
            setMessages(data);
            await AsyncStorage.setItem('@ton:messages', JSON.stringify(data));

            setLoading(false);

            setSocket(io(SOCKET_URL));

            if (route.params) {
                sendMessage(route.params.content, null);
            }

            const availableVoices = await Speech.getAvailableVoicesAsync();
            const portugueseVoices = availableVoices.filter(voice2 => voice2.language.includes('pt'));
            setTtsVoice(portugueseVoices[0].identifier);
        };

        execute();
    }, [route.params, sendMessage]);

    useEffect(() => {
        setNewMessage(false);
    }, [newMessage, setNewMessage]);

    useEffect(() => {
        if (!socket || !user) return () => {};

        socket.on(`chat:${user.id}`, (message?: Message) => {
            if (!message) return;

            setMessages(old => [...old, message]);
        });
        socket.on(`answer:${user.id}`, async (answers: ContentMessage[]) => {
            await wait(2000);
            setCurrentAnswers(answers);
        });

        return () => socket.removeAllListeners();
    }, [socket, user]);

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
                        {!route.params?.content && (
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
                        )}

                        <MessageList
                            ref={messageListRef}
                            onContentSizeChange={() => messageListRef.current?.scrollToEnd()}
                        >
                            {messages.map((message, index) => {
                                const sentFromUser = message.senderId === user.id;

                                return (
                                    <View key={index}>
                                        {Object.keys(dates).includes(message.id) && (
                                            <DateSection>
                                                <DateSectionMark />
                                                <DateSectionText>{dates[message.id]}</DateSectionText>
                                            </DateSection>
                                        )}

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
                                                    {(() => {
                                                        const identifier = message.body.substring(0, 3);
                                                        const file = message.body.substring(4);

                                                        if (identifier === 'img') {
                                                            return (
                                                                <Image
                                                                    source={{
                                                                        uri: `${API_URL}/files/${file}`,
                                                                    }}
                                                                    style={{
                                                                        height: 50 * vh,
                                                                        width: 60 * vw,
                                                                    }}
                                                                    resizeMode="contain"
                                                                />
                                                            );
                                                        } else if (identifier === 'vid') {
                                                            return (
                                                                <Video
                                                                    source={{
                                                                        uri: `${API_URL}/files/${file}`,
                                                                    }}
                                                                    style={{
                                                                        height: 50 * vh,
                                                                        width: 60 * vw,
                                                                    }}
                                                                    useNativeControls
                                                                    // @ts-ignore
                                                                    resizeMode={ResizeMode.CONTAIN}
                                                                />
                                                            );
                                                        }

                                                        return (
                                                            <MessageText sentFromUser={sentFromUser}>
                                                                {message.body}
                                                            </MessageText>
                                                        );
                                                    })()}
                                                    <MessageTime sentFromUser={sentFromUser}>
                                                        {format(new Date(message.createdAt), 'HH:mm')}
                                                    </MessageTime>
                                                </View>
                                                {message.senderId !== user.id &&
                                                    !message.body.substring(0, 4).match(/img|vid/) && (
                                                        <MessageSpeaker
                                                            onPress={async () =>
                                                                Speech.speak(message.body, {
                                                                    rate: 1.1,
                                                                    voice,
                                                                })
                                                            }
                                                        />
                                                    )}
                                            </MessageView>
                                            {sentFromUser && <MessageTriangle sentFromUser={sentFromUser} />}
                                        </MessageCompleteView>
                                    </View>
                                );
                            })}

                            {currentAnswers.length > 0 &&
                                (currentAnswers.length > 1 ? (
                                    <Button
                                        bold
                                        onPress={async () => {
                                            showAnswerSelection(true);
                                        }}
                                        style={{
                                            marginBottom: 2 * vh,
                                            marginHorizontal: 5 * vw,
                                        }}
                                    >
                                        Selecionar
                                    </Button>
                                ) : (
                                    <Button
                                        onPress={async () => {
                                            sendMessage(currentAnswers[0].body, currentAnswers[0].sequelId);
                                            setCurrentAnswers([]);
                                        }}
                                        style={{
                                            alignSelf: 'center',
                                            marginBottom: 2 * vh,
                                        }}
                                    >
                                        {currentAnswers[0].body}
                                    </Button>
                                ))}
                        </MessageList>

                        {route.params?.content ? (
                            <EducationalHeader />
                        ) : (
                            <Header>
                                <BackButton size={9 * vw} style={{ left: 3 * vw, position: 'absolute' }} />
                                <LogoTitle>
                                    <MinLogo width={9 * vw} style={{ marginTop: 0.8 * vh }} />
                                    <HeaderTitle>TON</HeaderTitle>
                                </LogoTitle>
                            </Header>
                        )}
                    </Container>
                </>
            )}

            {answerSelectionVisible && (
                <AnswerSelectionBackground>
                    <AnswerSelection>
                        <AnswerSelectionTitle>Selecionar resposta:</AnswerSelectionTitle>

                        {currentAnswers.map(answer => (
                            <AnswerSelectionLine
                                key={answer.id}
                                onPress={() => {
                                    showAnswerSelection(false);
                                    sendMessage(answer.body, answer.sequelId);
                                    setCurrentAnswers([]);
                                }}
                            >
                                <AnswerSelectionText>{answer.body}</AnswerSelectionText>

                                <Icon name="arrow-right-circle" size={3.5 * vh} color="#fff" />
                            </AnswerSelectionLine>
                        ))}
                    </AnswerSelection>
                </AnswerSelectionBackground>
            )}

            <BottomBar />
        </>
    );
};

export default Chat;
