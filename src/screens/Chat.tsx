import { RouteParams } from 'data/@types/navigation';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';

import { Container, MessageView, MessageTime, MessageText } from '@styles/Chat';

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

 useEffect(() => {
  if (route.params) {
   setMessages([
    {
     sender: 'user',
     body: route.params.content,
     time: new Date(),
    },
   ]);
  }
 }, [route]);

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
