import { RouteParams } from 'data/@types/navigation';
import { wait } from 'data/utils';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';

import { Container, MessageView, MessageTime, MessageText } from '@styles/Chat';

import answers from 'assets/messages.json';

interface Message {
  sender: string;
  body: string;
  time: Date;
}

export interface ChatParams {
  content: string;
}

const Chat: React.FC<RouteParams<ChatParams>> = ({ route }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const answer = useCallback(async (message: string) => {
    // @ts-ignore
    const responses: string[] = answers[message];

    responses.forEach(async (response, i) => {
      await wait(2000 * (i + 1));

      setMessages(old => [
        ...old,
        {
          sender: 'system',
          body: response,
          time: new Date(),
        },
      ]);
    });
  }, []);

  useEffect(() => {
    if (route.params) {
      setMessages([
        {
          sender: 'user',
          body: route.params.content,
          time: new Date(),
        },
      ]);

      answer(route.params.content);
    }
  }, [answer, route]);

  return (
    <>
      <Container>
        <FlatList
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: message }) => (
            <MessageView sender={message.sender}>
              <MessageText>{message.body}</MessageText>
              <MessageTime>{format(message.time, 'HH:mm')}</MessageTime>
            </MessageView>
          )}
          inverted
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
        />
      </Container>

      <BottomBar />
    </>
  );
};

export default Chat;
