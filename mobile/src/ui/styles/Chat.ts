import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface MessageProps extends ViewProps {
  sender: string;
}

export const Container = styled.View`
  flex: 1;
  flex-direction: column-reverse;
`;

export const MessageView = styled.View<MessageProps>`
  min-width: 30%;
  max-width: 65%;
  background-color: #a3bee9;

  border: 1px #000;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 12px;
  ${({ sender }) =>
    sender === 'system'
      ? {
          marginLeft: 16,
          marginRight: 'auto',
        }
      : {
          marginLeft: 'auto',
          marginRight: 16,
        }}
`;

export const MessageText = styled.Text`
  margin-bottom: 2px;
  margin-right: 8px;
`;

export const MessageTime = styled.Text`
  align-self: flex-end;

  font-size: 12px;
`;
