import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContentMessage, Message } from 'backend';
import { format } from 'date-fns';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StatusBar, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { io, Socket } from 'socket.io-client';

import BackButton from '@components/BackButton';
import BottomBar from '@components/BottomBar';
import Button from '@components/Button';
import Header from '@components/Header';
import { useAuth } from '@context/auth';
import { useInfo } from '@context/info';
import { wait } from '@utils';
import { vh, vw } from '@utils';

import api from '@api';

import mainTheme from '@theme';

import MinLogo from 'assets/minLogo.svg';
import Send from 'assets/send.svg';

import {
    ChatHeader,
    Container,
    DateSection,
    DateSectionMark,
    DateSectionText,
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
} from './styles';

interface DateDict {
    [id: string]: string;
}

export default function Chat() {
    const { user } = useAuth();
    const { newMessage, setNewMessage } = useInfo();
    const { content } = useLocalSearchParams<{ content: string }>();

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

            setSocket(io(process.env.SOCKET_URL!));

            if (content) {
                sendMessage(content, null);
            }

            const availableVoices = await Speech.getAvailableVoicesAsync();
            const portugueseVoices = availableVoices.filter(voice2 => voice2.language.includes('pt'));
            setTtsVoice(portugueseVoices[0].identifier);
        };

        execute();
    }, [content, sendMessage]);

    useEffect(() => {
        setNewMessage(false);
    }, [newMessage, setNewMessage]);

    useEffect(() => {
        if (!socket || !user) return () => {};

        socket.on(`chat:${user.id}`, (message: Message) => {
            console.log(message);
            setMessages(old => [...old, message]);
        });
        socket.on(`answer:${user.id}`, async (answers: ContentMessage[]) => {
            console.log(answers);
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
                        {!content && (
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
                                                                        uri: `${process.env.API_URL}/files/${file}`,
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
                                                                        uri: `${process.env.API_URL}/files/${file}`,
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

                        {content ? (
                            <Header>Educação</Header>
                        ) : (
                            <ChatHeader>
                                <BackButton size={9 * vw} style={{ left: 3 * vw, position: 'absolute' }} />
                                <LogoTitle>
                                    <MinLogo width={9 * vw} style={{ marginTop: 0.8 * vh }} />
                                    <HeaderTitle>TON</HeaderTitle>
                                </LogoTitle>
                            </ChatHeader>
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
}
