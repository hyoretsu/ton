import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vh, vw } from '@units/viewport';

export const Container = styled.View`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.purple};
`;

export const CloseButton = styled(TouchableOpacity).attrs({
    containerStyle: {
        borderRadius: 50 * vw,
        position: 'absolute',
        right: 8 * vw,
        top: 3 * vh,
    },
})``;

export const PhotoView = styled.View`
    align-items: center;
`;

export const EditPhotoView = styled.View`
    flex-direction: row;
`;

export const EditPhotoText = styled.Text`
    align-self: flex-end;

    font-family: ${({ theme }) => theme.fontFamily.bold};
    color: #fff;

    margin: 0 1vw -0.5vh 0;
`;

export const ContentView = styled.View`
    align-items: center;
`;

export const EditTitle = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.5em;
    color: #fff;

    margin: 2vh 0 2vh;
`;

export const Form = styled.View`
    align-items: center;

    margin: 0 6vw;
`;

export const MinLogoView = styled.View`
    align-self: flex-end;
    position: absolute;
    bottom: -0.5vh;
    right: -1vw;

    background-color: #fff;

    padding: 4vh 7vw 4vh 4vw;
    border-radius: 8vw 3vw 0 3vw;
    border-bottom-right-radius: 0;
    margin-left: 5vw;
`;
