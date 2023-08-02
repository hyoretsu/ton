import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vw } from '@units/viewport';

export const Container = styled.View`
    padding: 5vh 11vw;
`;

export const PatientInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const PatientGreeting = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1.5em;
    color: ${({ theme }) => theme.colors.purple};
`;

export const PatientName = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 2em;
    color: ${({ theme }) => theme.colors.purple};
`;

export const AppointmentView = styled.View`
    flex-direction: row;

    height: 15vh;
    width: 100%;

    background-color: ${({ theme }) => theme.colors.purple};

    border-radius: 8vw;
    margin-top: 6vh;
`;

export const AppointmentViewMarker = styled.View`
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 38%;

    background-color: #fff;

    border-radius: 8vw 0 0 8vw;
`;

export const AppointmentViewMarkerCircle = styled(TouchableOpacity).attrs({
    containerStyle: {
        borderRadius: 50 * vw,
    },
})`
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.gold};
    height: 7vh;
    width: 7vh;

    border-radius: 50vw;
`;

export const AppointmentInfo = styled.View`
    justify-content: center;

    padding: 0 4vw;
`;

export const AppointmentText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 0.7em;
    color: #fff;
`;

export const AppointmentDate = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.8em;
    color: #fff;
`;
