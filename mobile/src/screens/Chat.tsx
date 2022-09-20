import { useAuth } from '@contexts/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from 'backend';
import { RouteParams } from 'data/@types/navigation';
import { wait } from 'data/utils';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Feather';
import { io, Socket } from 'socket.io-client';

import BottomBar from '@components/BottomBar';

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

import answers from 'assets/messages.json';

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
  const [socket, setSocket] = useState<Socket>(null as unknown as Socket);

  const updateMessages = useCallback(() => {
    api.get('/messages').then(({ data }) => {
      setMessages(data);
      AsyncStorage.setItem('@eOdontologia:messages', JSON.stringify(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@eOdontologia:messages').then(storedMessages => {
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }

      updateMessages();
    });

    setSocket(io('http://192.168.0.11:3332'));

    if (route.params) {
      setMessages([
        {
          id: '0',
          senderId: 'user',
          body: route.params.content,
          recipientId: 'system',
          createdAt: new Date(),
        },
      ]);

      // @ts-ignore
      const responses: string[] = answers[route.params.content];

      responses.forEach(async (response, i) => {
        await wait(2000 * (i + 1));

        setMessages(old => [
          ...old,
          {
            id: String(old.length),
            senderId: 'system',
            body: response,
            recipientId: 'user',
            createdAt: new Date(),
          },
        ]);
      });
    }

    Tts.getInitStatus().then(
      () => {
        Tts.setDefaultLanguage('pt-BR');
        Tts.setDefaultRate(0.45);
      },
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      },
    );
  }, [route.params, updateMessages]);

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

  const sendMessage = async (): Promise<void> => {
    if (currentMessage) {
      const { data: newMessage } = await api.post('/messages', {
        body: currentMessage,
        recipientId: user.doctorId,
      });

      setMessages(old => [...old, newMessage]);
      AsyncStorage.setItem('@eOdontologia:messages', JSON.stringify(messages));

      setCurrentMessage('');
    }
  };

  return (
    <>
      <Container>
        <InputView>
          <UserInput onChangeText={setCurrentMessage} value={currentMessage} />
          <MessageSend onPress={sendMessage}>
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
                {message.senderId !== user.id && <MessageSpeaker onPress={() => Tts.speak(message.body)} />}
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

      <BottomBar />
    </>
  );
};

export default Chat;
