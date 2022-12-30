import { Dimensions } from 'react-native';
import styled from 'rn-css';

export const ConfirmationPrompt = styled.View`
    flex-direction: row;
    justify-content: space-between;

    margin-top: 20px;
`;

export const ConfirmationText = styled.Text`
    font-size: 22px;
    font-weight: 500;
    color: #889ae8;
    text-align: center;

    margin: 20px 0;
`;

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

const { width } = Dimensions.get('window');
export const Photo = styled.Image`
    width: ${width * 0.85}px;
    height: ${((width * 0.85) / 9) * 16}px;
`;
