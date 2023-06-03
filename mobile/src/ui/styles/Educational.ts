import { vw } from '@units/viewport';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

export const Container = styled(ScrollView)`
    flex: 1;
`;

export const ContentButton = styled(TouchableOpacity).attrs({
    containerStyle: {
        borderRadius: 50 * vw,
    },
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.colors.purple};

    border-radius: 50vw;
    padding: 1vh 0 1vh 10vw;
    margin-bottom: 2vh;
`;

export const ContentTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1.2em;
    color: #fff;
`;

export const ContentDate = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 0.7em;
    font-style: italic;
    color: #fff;
`;

export const NewNotification = styled.Text`
    position: absolute;
    right: 4vw;
    top: 1vh;

    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 0.6em;
    text-transform: uppercase;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.purple};

    padding: 1vw;
    padding-left: 1.3vw;
    border-radius: 1vw;
`;
