import { RectButton } from 'react-native-gesture-handler';
import styled from 'rn-css';

interface ButtonTextProps {
    isSelected?: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    justify-content: center;

    height: 12vh;
    background-color: #fff;
`;

export const MiddleButtonView = styled.View`
    flex: 0.2;
    align-items: center;
`;

export const Button = styled(RectButton)`
    flex: 0.2;
    justify-content: center;
    align-items: center;
`;

export const ButtonNotification = styled.View`
    position: absolute;
    top: 10%;
    right: 10%;

    height: 8px;
    width: 8px;
    background-color: #0f0;

    border-radius: 50vw;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fontFamily.medium};
    font-size: 14px;
    color: ${({ isSelected, theme }) => (isSelected ? theme.colors.purple : theme.colors.gray)};

    margin: 1vh 0;
`;
