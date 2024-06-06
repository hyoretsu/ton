import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vh, vw } from '@utils';

export const Container = styled(ScrollView)`
    flex: 1;
`;

export const ContentButton = styled(TouchableOpacity).attrs({
    containerStyle: {
        borderRadius: 50 * vw,
        marginBottom: 2 * vh,
    },
})`
    align-items: flex-start;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.purple};

    border-radius: 50vw;
    padding: 1vh 0 1vh 7vw;
`;

export const ContentTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1.2em;
    color: #fff;
`;
