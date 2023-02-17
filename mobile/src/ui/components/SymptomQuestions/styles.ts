import { vw } from '@units/viewport';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import Button from '@components/Button';

interface SelectionItemProps {
    horizontal?: boolean;
}

interface SelectionCircleProps {
    selected: boolean;
}

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.7em;
    color: ${({ theme }) => theme.colors.purple};
    text-align: center;
`;

export const TitleDivision = styled.View`
    width: 15vw;
    height: 0;

    border-bottom: 1px ${({ theme }) => theme.colors.purple};
    margin-top: 4vh;
`;

export const Container = styled(ScrollView).attrs({
    contentContainerStyle: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
})`
    margin: 2vh 0 1vh;
`;

export const Symptom = styled.View`
    width: 100%;
    align-items: center;

    margin: 1vh 0 2vh;
`;

export const SymptomQuestion = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1em;
    color: ${({ theme }) => theme.colors.purple};
    text-align: center;

    margin-bottom: 2vh;
`;

export const Selection = styled.View`
    flex-direction: row;
    justify-content: center;

    width: 100%;

    padding: 0 2vw;
`;

export const SelectionItem = styled.View<SelectionItemProps>`
    ${({ horizontal }) => horizontal && { flexDirection: 'row' }};
    align-items: center;

    ${({ horizontal }) => horizontal && { width: '100%' }};

    margin: 0 5vw ${({ horizontal }) => (horizontal ? 1 : 0)}vh;
`;

export const SelectionCircle = styled(TouchableOpacity).attrs<SelectionCircleProps>({
    containerStyle: {
        borderRadius: 50 * vw,
    },
})`
    width: 6vw;
    height: 6vw;
    background-color: ${({ selected, theme }) => (selected ? theme.colors.purple : 'transparent')};

    border: 1.5px ${({ theme }) => theme.colors.purple};
    border-radius: 50vw;
`;

export const SelectionText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 0.9em;

    margin-top: 1vh;
`;

export const SelectionButton = styled(Button)``;

export const SelectionInput = styled(TextInput)`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1em;

    color: #fff;
    width: 100%;
    text-align: center;

    border: 1.5px solid ${({ theme }) => theme.colors.purple};
    border-radius: 50vw;
`;

export const Footer = styled.View`
    flex-direction: row;
    align-items: center;

    width: 100%;

    padding: 0 2vw 1vh;
`;

interface ProgressCircleProps {
    current: number;
}

export const ProgressCircle = styled.View<ProgressCircleProps>`
    width: 2vw;
    height: 2vw;
    background-color: ${({ current, theme }) => {
        switch (Math.sign(current)) {
            case -1:
                return 'transparent';
            case 1:
                return theme.colors.purple;
            default:
                return theme.colors.gold;
        }
    }};

    border: 1.5px ${({ current, theme }) => (current === 0 ? theme.colors.gold : theme.colors.purple)};
    border-radius: 50vw;
`;
