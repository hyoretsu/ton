import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;

    padding: 0 28px 0;
`;

export const Title = styled.Text`
    font-size: 36px;
    font-weight: 500;
    color: #4a56c4;

    margin: 44px 0 36px;
`;

export const Form = styled.View`
    align-items: center;

    width: 100%;
`;

export const FormFields = styled.View`
    margin: 48px 0;
`;

export const ForgotPassword = styled(TouchableOpacity)`
    margin: 8px auto 0;
`;

export const ForgotPasswordText = styled.Text`
    font-size: 16px;
    color: #fff;
`;
