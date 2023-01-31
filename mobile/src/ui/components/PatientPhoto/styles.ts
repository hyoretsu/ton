import { vw } from '@units/viewport';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

export const PatientPhotoCircle = styled(TouchableOpacity).attrs({
    containerStyle: {
        aspectRatio: 1,
        borderRadius: 50 * vw,
    },
})`
    align-items: center;
    justify-content: center;

    height: 100%;

    border-radius: 50vw;
`;
