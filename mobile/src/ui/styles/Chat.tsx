import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column-reverse;
`;

export const MessageView = styled.View`
  flex-direction: row;
  align-items: center;

  max-width: 76%;
  background-color: #a3bee9;

  border: 1px #000;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 12px;
`;

export const MessageText = styled.Text`
  margin-bottom: 2px;
  margin-right: 8px;
`;

export const MessageTime = styled.Text`
  align-self: flex-end;

  font-size: 12px;
`;

export const MessageSpeaker = styled(TouchableOpacity).attrs({ children: <Icon name="sound" size={20} /> })`
  flex: 1;
  justify-content: center;

  margin-left: 8px;
`;

export const DateSection = styled.View`
  align-items: center;
  position: relative;

  margin: -4px 0 4px;
`;

export const DateSectionMark = styled.View`
  position: absolute;
  top: 10px;

  width: 100%;
  height: 1px;
  background-color: #0005;
`;

export const DateSectionText = styled.Text`
  background-color: #c4d3f2;
`;

export const InputView = styled.View`
  flex-direction: row;

  width: 100%;
  height: 40px;

  margin: 12px 0 16px;
`;

export const UserInput = styled.TextInput`
  flex: 1;

  background-color: #fff;
  color: #000;

  border-radius: 30px;
  padding: 0 12px;
  margin-left: 16px;
`;

export const MessageSend = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 40px;
  background-color: #8099ceaa;

  border-radius: 20px;
  margin: 0 16px;
`;
