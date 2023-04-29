import { Message } from 'backend';
import { useAuth } from 'data/contexts/auth';
import { format } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { io, Socket } from 'socket.io-client';

import api from '@api';

import {
    ChatBox,
    DateSpan,
    InputDiv,
    InputSendCircle,
    MessageDiv,
    Messages,
    Styling,
} from '@styles/admin/patient/[patientId]/chat';

interface DateDict {
    [id: string]: string;
}

const Chat: React.FC = () => {
    const { user } = useAuth();
    const {
        back,
        query: { patientId },
    } = useRouter();

    const [dates, setDates] = useState<DateDict>({});
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [socket, setSocket] = useState<Socket>(null as unknown as Socket);
    const [writtenMessage, setWrittenMessage] = useState('');

    const updateMessages = useCallback(async () => {
        // const { data } = await api.get(`/messages`);
        const { data } = await api.get(`/messages?patientId=${patientId}`);

        setMessages(data);
        localStorage.setItem(`@ton:messages_${patientId}`, JSON.stringify(data));
    }, [patientId]);

    const sendMessage = async (message: string): Promise<void> => {
        if (!message) return;

        await api.post('/messages', { body: message, recipientId: patientId });
        setWrittenMessage('');
    };

    // Init
    useEffect(() => {
        const execute = async (): Promise<void> => {
            const storedMessages = localStorage.getItem('@ton:messages');
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }

            await updateMessages();

            setSocket(io(process.env.NEXT_PUBLIC_SOCKET_URL as string));
        };

        execute();
    }, [updateMessages]);

    useEffect(() => {
        if (!socket) return () => {};

        socket.on(`chat:${patientId}`, async () => updateMessages());

        return () => socket.removeAllListeners();
    }, [patientId, socket, updateMessages]);

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

        if (messagesRef?.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <NextSeo title="Chat" nofollow noindex />
            <Styling>
                <button type="button" onClick={back} style={{ left: '2vw', position: 'absolute' }}>
                    Voltar
                </button>
                <ChatBox>
                    <InputDiv
                        onSubmit={e => {
                            e.preventDefault();
                            sendMessage(writtenMessage);
                        }}
                    >
                        <input
                            value={writtenMessage}
                            onChange={e => setWrittenMessage(e.target.value)}
                            style={{ width: '100%' }}
                        />

                        <InputSendCircle type="submit">
                            <FiSend size="3vh" />
                        </InputSendCircle>
                    </InputDiv>

                    <Messages ref={messagesRef}>
                        {messages.map(message => (
                            <>
                                {Object.keys(dates).includes(message.id) && (
                                    <DateSpan>{format(new Date(message.createdAt), 'dd/M/yyyy')}</DateSpan>
                                )}

                                <MessageDiv key={message.id} sentFromUser={message.senderId === user?.id}>
                                    <p>{message.sender.name}</p>
                                    <p>{message.body}</p>
                                    <span>{format(new Date(message.createdAt), 'HH:mm')}</span>
                                </MessageDiv>
                            </>
                        ))}
                    </Messages>
                </ChatBox>
            </Styling>
        </>
    );
};

export default Chat;
