import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
 flex: 1;
 align-items: center;

 padding: 24px 28px 0;
`;

export const Title = styled.Text`
 font-size: 32px;
 font-weight: 500;
 color: #4a56c4;

 margin-bottom: 24px;
`;

export const Form = styled.View`
 width: 100%;
`;

export const FormFields = styled.View`
 margin-bottom: 24px;
`;

export const BirthdatePhone = styled.View`
 flex-direction: row;
 justify-content: space-between;
`;

export const Birthdate = styled(RectButton)`
 flex: 1;
 align-items: center;
 justify-content: center;

 background: #8ca9d8;

 border-radius: 10px;
 margin: 0 16px 12px 0;
`;

export const BirthdateText = styled.Text`
 color: #fff8;
`;

export const BackToSignIn = styled(RectButton)`
 flex-direction: row;
 align-items: center;
 justify-content: center;

 height: 64px;
 background: #889ae8;
`;

export const BackToSignInText = styled.Text`
 font-size: 18px;
 color: #fff;

 margin-left: 12px;
`;
