import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    align-items: center;

    background: #3d6;

    border-radius: 10px;
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
`;
