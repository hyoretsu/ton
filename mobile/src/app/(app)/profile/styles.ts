import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'rn-css';

import { vh, vw } from '@utils';

export const Container = styled.View`
    flex: 1;

    background-color: #fff;

    padding: 3vh 7vw 3vh 9vw;
`;

export const PatientInfo = styled.View`
    flex-direction: row;

    height: 16vh;

    margin: 2vh 0 5vh;
`;

export const PatientNameEditView = styled.View`
    margin: 3vh 0 0 5vw;
`;

export const PatientEditView = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
`;

export const PatientEditText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};

    margin-left: 1vw;
`;

export const ProfileOption = styled(TouchableOpacity).attrs({
    containerStyle: {
        marginLeft: 4 * vw,
        marginTop: 6 * vh,
    },
})`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 1vh 0;
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.purple};
`;

export const ProfileOptionText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.purple};
    font-size: 1.4em;
`;

export const LogoutButton = styled(TouchableOpacity).attrs({
    containerStyle: {
        alignSelf: 'flex-end',
        marginTop: 7 * vh,
    },
})`
    flex-direction: row;
    align-items: center;
`;

export const LogoutText = styled.Text`
    font-family: ${({ theme }) => theme.fontFamily.regular};
    color: ${({ theme }) => theme.colors.gold};

    margin-right: 1vw;
`;
