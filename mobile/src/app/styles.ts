import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vh } from '@utils';

export const Container = styled.View`
    flex: 1;
    align-items: center;

    padding: 0 15vw 0;
`;

export const AppInfo = styled.View`
    align-items: center;

    margin-top: 15vw;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 5.1em;
    text-transform: lowercase;
    color: ${({ theme }) => theme.colors.purple};
`;

export const SubTitleFirst = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 0.85em;
    color: ${({ theme }) => theme.colors.purple};

    margin-top: -2vh;
`;

export const SubTitleSecond = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 0.54em;
    color: ${({ theme }) => theme.colors.purple};
`;

export const Form = styled.View`
    align-items: center;

    width: 100%;

    margin-top: 4vh;
`;

export const FormFields = styled.View`
    margin-top: 2vh;
`;

export const ForgotPassword = styled(TouchableOpacity).attrs({
    containerStyle: {
        alignSelf: 'center',
        marginTop: 2 * vh,
    },
})``;

export const ForgotPasswordText = styled.Text`
    align-self: center;

    font-size: 0.8em;
    color: ${({ theme }) => theme.colors.purple};
    text-decoration: underline;
`;
