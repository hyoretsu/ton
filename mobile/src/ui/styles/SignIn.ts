import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  padding: 24px 28px 0;
`;

export const CreateAccount = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 64px;
  background: #889ae8;
`;

export const CreateAccountText = styled.Text`
  font-size: 18px;
  color: #fff;

  margin-left: 12px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const ForgotPasswordModal = styled.View`
  align-items: center;

  width: 60%;
  background-color: #c4d3f2;

  border-radius: 15px;
  padding: 12px 0 16px;
`;

export const ForgotPasswordModalText = styled.Text`
  font-size: 16px;
  text-align: center;

  margin-bottom: 10px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const Form = styled.View`
  align-items: center;

  width: 100%;

  margin-top: 40px;
`;

export const FormFields = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: 500;
  color: #4a56c4;

  margin-bottom: 28px;
`;
