import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';

import { Container, MessageView, MessageTime, MessageText } from '@styles/Chat';

interface Message {
 id: string;
 sender: string;
 body: string;
 time: Date;
}

const Chat: React.FC = () => {
 const [messages, setMessages] = useState<Message[]>([]);

 useEffect(() => {
  setMessages([
   {
    id: '0',
    sender: 'user',
    body: 'Olá',
    time: new Date(2022, 7, 7),
   },
   {
    id: '1',
    sender: 'system',
    body: 'Olá',
    time: new Date(2022, 7, 7),
   },
   {
    id: '2',
    sender: 'system',
    body: 'Boa tarde!',
    time: new Date(2022, 7, 7),
   },
   {
    id: '3',
    sender: 'user',
    body: 'Qual é o conteúdo educacional dessa semana?',
    time: new Date(2022, 7, 7),
   },
   {
    id: '4',
    sender: 'system',
    body: 'Aqui está: "Por que o acompanhamento odontológico é importante para o tratamento do cancer?"',
    time: new Date(2022, 7, 7),
   },
  ]);
 }, []);

 return (
  <>
   <Container>
    <FlatList
     data={messages}
     keyExtractor={message => message.id}
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
