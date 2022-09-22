import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(ScrollView)`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 500;
  color: #889ae8;

  margin: 12px 0;
`;

export const Form = styled.View`
  align-items: center;

  margin: 0 10%;
`;

export const FormFields = styled.View`
  margin: auto 0;
`;

export const Modal = styled.View`
  align-items: center;

  width: 60%;
  background-color: #c4d3f2;

  border-radius: 15px;
  padding: 16px 4px;
`;

export const ModalText = styled.Text`
  font-size: 16px;
  text-align: center;

  margin-bottom: 10px;
`;
