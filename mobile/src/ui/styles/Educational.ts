import { RectButton, ScrollView } from 'react-native-gesture-handler';
import styled from 'rn-css';

export const Container = styled(ScrollView)`
    flex: 1;
`;

export const ContentBox = styled.View`
    border: 2px #0006;
    border-radius: 20px;
    margin-bottom: 20px;
`;

export const ContentButton = styled(RectButton)`
    background-color: #a3bee9;

    border-radius: 18px;
    padding: 8px 4px 8px 16px;
`;

export const ContentDate = styled.Text`
    font-size: 14px;
    color: #0008;
`;

export const ContentDateIcon = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ContentTitle = styled.Text`
    font-size: 20px;
`;
