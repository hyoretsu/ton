import { Feather as Icon } from '@expo/vector-icons';
import { vh, vw } from '@units/viewport';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'rn-css';

interface ObjectiveProps {
    completed: boolean;
}

export const Container = styled(ScrollView).attrs({
    contentContainerStyle: {
        paddingHorizontal: 11 * vw,
        paddingVertical: 5 * vh,
    },
})`
    flex: 1;
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

export const AppointmentViewMarkerCircle = styled.View`
    background-color: ${({ theme }) => theme.colors.purple};
    height: 40%;
    width: 40%;

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

export const ObjectivesText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 1.5em;
    color: ${({ theme }) => theme.colors.purple};

    margin-top: 3vh;
`;

export const ObjectiveView = styled.View<ObjectiveProps>`
    flex-direction: row;

    background-color: ${({ completed, theme }) => (completed ? 'transparent' : theme.colors.purple)};

    padding: 2vh 4vw 2vh 8vw;
    margin-top: 2vh;
    border: 1.5px solid ${({ theme }) => theme.colors.purple};
    border-radius: 50vw;
`;

export const ObjectiveTitle = styled.Text<ObjectiveProps>`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    font-size: 1.1em;
    color: ${({ completed, theme }) => (completed ? theme.colors.purple : '#fff')};
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'solid')};

    margin-right: auto;
`;

export const ObjectiveLink = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.bold};
    font-size: 2em;
    color: #fff;

    margin: -1.2vh 0;
    margin-right: 2vw;
`;

export const ObjectiveCheck = styled(Icon).attrs({ name: 'check-circle', size: 30 })`
    color: ${({ theme }) => theme.colors.purple};

    margin: -0.5vh 0 -1.5vh;
`;
