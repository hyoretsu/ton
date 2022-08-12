import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ButtonProps extends RectButtonProps {
 isCurrentScreen?: boolean;
}

export const Container = styled.View`
 flex-direction: row;
 justify-content: center;

 height: 60px;

 border-top-width: 1px;
 border-color: #0003;
`;

export const Button = styled(RectButton)<ButtonProps>`
 flex: 0.25;
 justify-content: center;
 align-items: center;

 background-color: #c4d3f2;
`;

export const ButtonText = styled.Text`
 font-size: 14px;
`;
