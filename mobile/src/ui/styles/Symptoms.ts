import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface SelectionCircleProps {
  selected: boolean;
}

export const Container = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 500;
  color: #889ae8;
  text-align: center;

  margin-top: 20px;
`;

export const Info = styled.Text`
  font-size: 18px;
  color: #889ae8;
  text-align: center;

  width: 75%;

  margin: 20px 0;
`;

export const Symptom = styled.View`
  margin-bottom: 16px;
`;

export const SymptomQuestion = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #889ae8;
  text-align: center;

  margin-bottom: 12px;
`;

export const Selection = styled.View`
  flex-direction: row;

  width: 100%;

  padding: 0 8px;
`;

export const SelectionText = styled.Text`
  font-size: 16px;
  color: #52609d;
`;

export const SelectionItem = styled.View`
  align-items: center;

  margin: 0 auto;
`;

export const SelectionCircle = styled(TouchableOpacity)<SelectionCircleProps>`
  width: 20px;
  height: 20px;
  background-color: ${({ selected }) => (selected ? '#889ae8' : '#c4d3f2')};

  border: ${({ selected }) => (selected ? 0 : 2)}px #889ae8;
  border-radius: 10px;
`;

export const SelectionNumber = styled.Text`
  color: #52609d;
`;
