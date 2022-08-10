import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Button, ButtonText, Container } from './styles';

const BottomBar: React.FC = () => {
 const { navigate } = useNavigation();
 const route = useRoute();

 const onDiary = route.name === 'Diary';
 const onEducational = route.name === 'Educational';
 const onChat = route.name === 'Chat';
 const onProfile = route.name === 'Profile';
 const highlightColor = '#8099ce';

 return (
  <Container>
   <Button onPress={() => navigate('Diary')} isCurrentScreen={onDiary}>
    <Icon name="archive" size={30} color={onDiary ? highlightColor : '#000'} />
    <ButtonText>Diário</ButtonText>
   </Button>

   <Button onPress={() => navigate('Educational')} isCurrentScreen={onEducational}>
    <Icon name="book" size={30} color={onEducational ? highlightColor : '#000'} />
    <ButtonText>Educação</ButtonText>
   </Button>

   <Button onPress={() => navigate('Chat')} isCurrentScreen={onChat}>
    <Icon name="message-square" size={30} color={onChat ? highlightColor : '#000'} />
    <ButtonText>Chat</ButtonText>
   </Button>

   <Button onPress={() => console.log('Profile')} isCurrentScreen={onProfile}>
    <Icon name="user" size={30} color={onProfile ? highlightColor : '#000'} />
    <ButtonText>Dados</ButtonText>
   </Button>
  </Container>
 );
};

export default BottomBar;
