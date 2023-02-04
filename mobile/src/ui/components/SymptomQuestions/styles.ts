import { vw } from '@units/viewport';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';
import mainTheme from 'ui/theme/main';

interface SelectionItemProps {
    horizontal?: boolean;
}

interface SelectionCircleProps {
    selected: boolean;
}

export const Container = styled(ScrollView).attrs({
    contentContainerStyle: {
        alignItems: 'center',
    },
})`
    margin-bottom: 2vh;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.7em;
    color: ${({ theme }) => theme.colors.purple};
    text-align: center;
`;

export const TitleDivision = styled.View`
    width: 28%;
    height: 0;

    border-bottom: 1px ${({ theme }) => theme.colors.purple};
    margin: 1vh 0;
`;

export const Symptom = styled.View`
    width: 100%;
    align-items: center;

    margin-bottom: 3vh;
`;

export const SymptomQuestion = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1em;
    color: ${({ theme }) => theme.colors.purple};
    text-align: center;

    margin-bottom: 1vh;
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

    margin: 0 3vw ${({ horizontal }) => (horizontal ? 1 : 0)}vh;
`;

export const SelectionCircle = styled(TouchableOpacity).attrs<SelectionCircleProps>({
    containerStyle: {
        borderRadius: 50 * vw,
        margin: 0.5 * vw,
    },
})`
    width: 5vw;
    height: 5vw;
    background-color: ${({ selected, theme }) => (selected ? theme.colors.gold : 'transparent')};

    border: 1.5px ${({ theme }) => theme.colors.purple};
    border-radius: 50vw;
`;

export const SelectionText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1em;
`;

export const SelectionColumn = styled.View``;

export const SelectionRow = styled.View`
    flex-direction: row;
    justify-content: space-evenly;

    margin-right: 5vw;
`;

export const SelectionInput = styled(TextInput).attrs({
    placeholderTextColor: mainTheme.colors.purple,
})`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1em;
    max-width: 13vw;

    padding: 0;
`;
