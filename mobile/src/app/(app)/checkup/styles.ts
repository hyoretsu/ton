import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vh, vw } from '@utils';

export const Container = styled.View`
    align-items: center;
    justify-content: space-around;
    flex: 1;

    background-color: ${({ theme }) => theme.colors.purple};

    padding: 0 5vw 1vh;
`;

export const GenericView = styled.View`
    align-items: center;
`;

export const CheckupTitle = styled.Text`
    align-self: center;

    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.2em;
    color: #fff;
`;

export const CheckupText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: #fff;
    text-align: center;
    max-width: 60%;

    margin-bottom: 3vh;
`;

export const StepView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;

    width: 60%;
`;

export const StepCircle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;

    width: 8.5vw;
    height: 8.5vw;
    background-color: #fff;

    border-radius: 50vw;
`;

export const StepNumber = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.3em;
    color: ${({ theme }) => theme.colors.purple};
`;

export const SymptomsButton = styled(TouchableOpacity).attrs({
    containerStyle: {
        borderRadius: 50 * vw,
        marginBottom: 6 * vh,
    },
})`
    align-items: center;
    justify-content: center;

    height: 18vw;
    width: 18vw;
    background-color: #fff;

    border-radius: 50vw;
`;
