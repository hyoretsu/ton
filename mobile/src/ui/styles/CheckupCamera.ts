import { Dimensions } from 'react-native';
import styled from 'rn-css';

export const CaptureButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 28px;
    left: ${Dimensions.get('window').width * 0.5 - 35}px;

    height: 70px;
    width: 70px;

    border: 2px #fff;
    border-radius: 35px;
`;

export const Guideline = styled.View`
    position: absolute;
    top: ${Dimensions.get('window').height * 0.5}px;

    width: 5px;
    height: 5px;
    background-color: #fff;

    border-radius: 3px;
`;

export const Interface = styled.View`
    align-items: center;
    position: absolute;

    width: 100%;
    height: 100%;
`;
