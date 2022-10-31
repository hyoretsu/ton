import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useStorage } from '@contexts/storage';

import { Button, ButtonText, Container } from './styles';

const BottomBar: React.FC = () => {
    const { navigate } = useNavigation();
    const { checkupProgress } = useStorage();
    const route = useRoute();

    const onChat = route.name === 'Chat';
    const onDiary = route.name === 'Diary';
    const onEducational = route.name === 'Educational';
    const onPersonal = route.name.match(/Appointments|EditProfile|Personal/);
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

            <Button
                onPress={() => {
                    const checkupLength = Object.entries(checkupProgress).length;

                    if (checkupLength === 10) {
                        navigate('Symptoms');
                    } else if (checkupLength > 0) {
                        navigate('CheckupInstructions');
                    } else {
                        navigate('CheckupBegin');
                    }
                }}
            >
                <Icon name="clipboard" size={30} color="#000" />
                <ButtonText>Exame</ButtonText>
            </Button>

            <Button onPress={() => navigate('Chat')} isCurrentScreen={onChat}>
                <Icon name="message-square" size={30} color={onChat ? highlightColor : '#000'} />
                <ButtonText>Chat</ButtonText>
            </Button>

            <Button onPress={() => navigate('Personal')} isCurrentScreen={onPersonal}>
                <Icon name="user" size={30} color={onPersonal ? highlightColor : '#000'} />
                <ButtonText>Paciente</ButtonText>
            </Button>
        </Container>
    );
};

export default BottomBar;
