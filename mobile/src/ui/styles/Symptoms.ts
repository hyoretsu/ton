import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

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
})``;

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
  width: 100%;
  align-items: center;

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
  justify-content: center;

  width: 100%;

  padding: 0 8px;
`;

export const SelectionColumn = styled.View``;

export const SelectionRow = styled.View`
  flex-direction: row;
  justify-content: space-evenly;

  margin-right: 20px;
`;

export const SelectionText = styled.Text`
  font-size: 16px;
  color: #52609d;
`;

export const SelectionInput = styled(TextInput).attrs({ placeholderTextColor: '#52609d' })`
  max-width: 60px;
  font-size: 16px;
  color: #52609d;

  padding: 0;
`;

export const SelectionItem = styled.View<SelectionItemProps>`
  ${({ horizontal }) => horizontal && { flexDirection: 'row' }}
  align-items: center;

  ${({ horizontal }) => horizontal && { width: '100%' }}

  margin: 0 12px ${({ horizontal }) => (horizontal ? 8 : 0)}px;
`;

export const SelectionCircle = styled(TouchableOpacity)<SelectionCircleProps>`
  width: 20px;
  height: 20px;
  background-color: ${({ selected }) => (selected ? '#889ae8' : '#c4d3f2')};

  margin: 0 8px;
  border: ${({ selected }) => (selected ? 0 : 2)}px #889ae8;
  border-radius: 10px;
`;
