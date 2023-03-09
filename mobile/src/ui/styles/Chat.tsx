import Icon from '@expo/vector-icons/AntDesign';
import { vh, vw } from '@units/viewport';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

interface MessageProps {
    sentFromUser: boolean;
}

export const Container = styled.View`
    flex: 1;
    flex-direction: column-reverse;

    margin-bottom: 3vh;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    height: 10vh;
    background-color: ${({ theme }) => theme.colors.purple};
`;

export const LogoTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: #fff;
    font-size: 2.5em;
    text-transform: lowercase;

    margin-left: 2vw;
`;

export const MessageList = styled(ScrollView).attrs({
    contentContainerStyle: {
        justifySelf: 'flex-end',
        paddingTop: 2 * vh,
    },
})``;

export const MessageCompleteView = styled.View<MessageProps>`
    align-self: ${({ sentFromUser }) => (sentFromUser ? 'flex-end' : 'flex-start')};
    flex-direction: row;

    margin: 0 4vw 12px;
`;

export const MessageView = styled.View<MessageProps>`
    flex-direction: row;
    align-items: center;

    max-width: 76%;
    background-color: ${({ sentFromUser, theme }) => (sentFromUser ? theme.colors.purple : '#fff')};

    border-radius: 3vw;
    ${({ sentFromUser }) => ({ [`borderBottom${sentFromUser ? 'Right' : 'Left'}Radius`]: 0 })};
    padding: 1vh 2.8vw 0.5vh ${({ sentFromUser }) => (!sentFromUser ? 6 : 3)}vw;
`;

export const MessageTriangle = styled.View<MessageProps>`
    align-self: flex-end;

    width: 0;
    height: 0;
    background-color: transparent;

    border-style: solid;
    border-width: ${({ sentFromUser }) => (sentFromUser ? '2vh 0 0 2vw' : '0 0 2vh 2vw')};
    border-color: transparent;
    ${({ sentFromUser, theme }) => ({
        [sentFromUser ? 'borderLeftColor' : 'borderBottomColor']: sentFromUser ? theme.colors.purple : '#fff',
    })};
`;

export const MessageSender = styled.Text<MessageProps>`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ sentFromUser, theme }) => (sentFromUser ? '#fff' : theme.colors.purple)};
    font-size: 0.7em;
`;

export const MessageText = styled.Text<MessageProps>`
    font-family: ${({ sentFromUser, theme }) => (!sentFromUser ? theme.fontFamily.medium : theme.fontFamily.regular)};
    color: ${({ sentFromUser, theme }) => (sentFromUser ? '#fff' : theme.colors.purple)};

    margin: 0.8vh 13.5vw 0.7vh 0;
`;

export const MessageTime = styled.Text<MessageProps>`
    align-self: ${({ sentFromUser }) => (sentFromUser ? 'flex-end' : 'flex-start')};

    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-style: italic;
    font-size: 0.5em;
    color: ${({ sentFromUser, theme }) => (sentFromUser ? '#fff' : theme.colors.purple)};
`;

export const MessageSpeaker = styled(TouchableOpacity).attrs({ children: <Icon name="sound" size={20} /> })`
    flex: 1;
    justify-content: center;

    margin-left: 8px;
`;

export const DateSection = styled.View`
    align-items: center;
    position: relative;

    margin: -4px 0 4px;
`;

export const DateSectionMark = styled.View`
    position: absolute;
    top: 50%;

    width: 87vw;
    height: 0.2vh;
    background-color: ${({ theme }) => theme.colors.purple};
`;

export const DateSectionText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: #fff;
    background-color: ${({ theme }) => theme.colors.purple};

    padding: 0.9vh 3vw 1vh;
    border-radius: 50vw;
`;

export const InputView = styled.View`
    flex-direction: row;

    width: 100%;

    margin: 12px 0 16px;
`;

export const InputVoiceView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    background-color: #fff;

    border-radius: 30px;
    padding: 0 4vw 0 5vw;
    margin: 0 3vw 0 4vw;
`;

export const UserInput = styled(TextInput)`
    flex: 1;

    color: #000;
`;

export const VoiceInput = styled(TouchableOpacity)``;

export const MessageSend = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;

    aspect-ratio: 1;
    width: 12vw;
    background-color: ${({ theme }) => theme.colors.purple};

    margin-right: 5vw;
    border-radius: 50vw;
`;

export const AnswerSelectionBackground = styled.View`
    justify-content: flex-end;
    position: absolute;
    top: 10vh;

    width: 100vw;
    height: 78vh;

    background-color: rgba(23, 20, 36, 0.9);
`;

export const AnswerSelection = styled.View`
    align-items: center;

    background-color: ${({ theme }) => theme.colors.purple};

    padding: 3vh 9vw 5vh 13vw;
    border-top-left-radius: 6vw;
    border-top-right-radius: 6vw;
`;

export const AnswerSelectionTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.1em;
    color: #fff;

    margin-bottom: 1vh;
`;

export const AnswerSelectionLine = styled(TouchableOpacity).attrs({
    containerStyle: {
        borderRadius: 50 * vw,
        marginTop: 2 * vh,
        paddingVertical: 1 * vh,
        width: '100%',
    },
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const AnswerSelectionText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 0.8em;
    color: #fff;
`;
