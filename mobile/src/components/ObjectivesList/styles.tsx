import { Feather as Icon } from '@expo/vector-icons';
import { ViewProps } from 'react-native';
import { RectButton, RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vh } from '@utils';

interface ObjectiveProps {
    completed: boolean;
}
interface ProgressProps extends ViewProps {
    progress: number;
}
interface ProgressSignProps extends RectButtonProps {
    sign: 'plus' | 'minus';
}

export const ObjectivesListTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.8em;
`;

export const ObjectiveView = styled(TouchableOpacity).attrs<ObjectiveProps>({
    containerStyle: {
        marginTop: 1 * vh,
    },
})`
    flex-direction: row;

    background-color: ${({ completed, theme }) => (completed ? 'transparent' : theme.colors.purple)};

    padding: 2vh 4vw 2vh 8vw;
    ${({ completed, theme }) =>
        completed && { borderWidth: 1.5, borderStyle: 'solid', borderColor: theme.colors.purple }};
    border-radius: 50vw;
`;

export const ObjectiveTitle = styled.Text<ObjectiveProps>`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1.1em;
    color: ${({ completed, theme }) => (completed ? theme.colors.purple : '#fff')};
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'solid')};

    margin-right: auto;
`;

export const ObjectiveLink = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 2em;
    color: #fff;

    margin: -1.2vh 0;
    margin-right: 2vw;
`;

export const ObjectiveCheck = styled(Icon).attrs({ name: 'check-circle', size: 30 })`
    color: ${({ theme }) => theme.colors.purple};

    margin: -0.5vh 0 -1.5vh;
`;

export const ProgressBar = styled.View`
    position: relative;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 28px;
    background-color: #0004;

    border-radius: 20px;
    margin-top: 2vh;
`;

export const ProgressBarColor = styled.View<ProgressProps>`
    position: absolute;
    left: 0;

    width: ${({ progress }) => progress * 100}%;
    height: 100%;
    background-color: #0f0;

    border-radius: 20px;
`;

export const ProgressBarText = styled.Text`
    font-size: 16px;
`;

export const ProgressSign = styled(RectButton).attrs<ProgressSignProps>((props: ProgressSignProps) => ({
    children: <Icon name={props.sign} size={20} />,
}))`
    position: absolute;

    ${({ sign }) =>
        sign === 'plus'
            ? {
                  right: 0,
                  paddingRight: 4,
                  paddingVertical: 2,
              }
            : {
                  left: 0,
                  paddingLeft: 4,
                  paddingVertical: 2,
              }};

    border: 2px #0006;
    border-radius: 20px;
`;
