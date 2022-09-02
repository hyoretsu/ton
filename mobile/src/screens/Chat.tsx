import { RouteParams } from 'data/@types/navigation';
import { wait } from 'data/utils';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Feather';

import BottomBar from '@components/BottomBar';

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

interface Message {
  id: string;
  sender: string;
  body: string;
  time: Date;
}

interface DateDict {
  [id: string]: string;
}

export interface ChatParams {
  content: string;
}

const Chat: React.FC<RouteParams<ChatParams>> = ({ route }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [dates, setDates] = useState<DateDict>({});

  useEffect(() => {
    if (route.params) {
      setMessages([
        {
          id: '0',
          sender: 'user',
          body: route.params.content,
          time: new Date(),
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
            sender: 'system',
            body: response,
            time: new Date(),
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
  }, [route.params]);

  useEffect(() => {
    messages.forEach(message => {
      const formattedDate = format(message.time, 'dd/MM/yyyy');

      if (!Object.values(dates).includes(formattedDate)) {
        setDates(old => ({
          ...old,
          [message.id]: formattedDate,
        }));
      }
    });
  }, [dates, messages]);

  const sendMessage = (): void => {
    if (currentMessage) {
      setMessages(old => [
        ...old,
        {
          id: String(messages.length - 1),
          sender: 'user',
          body: currentMessage,
          time: new Date(),
        },
      ]);
    }

    setCurrentMessage('');
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
              <MessageView sender={message.sender} style={index === messages.length - 1 && { marginBottom: 0 }}>
                <View>
                  <MessageText>{message.body}</MessageText>
                  <MessageTime>{format(message.time, 'HH:mm')}</MessageTime>
                </View>
                {message.sender === 'system' && <MessageSpeaker onPress={() => Tts.speak(message.body)} />}
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
