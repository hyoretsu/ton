import Icon from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import mainTheme from '@theme';
import { vw } from '@units/viewport';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';
import PatientPhoto from '@components/PatientPhoto';
import { useAuth } from '@context/auth';

import { PatientName } from '@styles/Home';
import {
    Container,
    LogoutButton,
    LogoutText,
    PatientEditText,
    PatientEditView,
    PatientInfo,
    PatientNameEditView,
    ProfileOption,
    ProfileOptionText,
} from '@styles/Profile';

const Profile: React.FC = () => {
    const { signOut, user } = useAuth();
    const { goBack, navigate } = useNavigation();

    return (
        <>
            <StatusBar backgroundColor="#fff" />

            <Container>
                <TouchableOpacity onPress={goBack} containerStyle={{ alignSelf: 'flex-end', borderRadius: 50 * vw }}>
                    <Icon name="x-circle" size={10 * vw} color={mainTheme.colors.purple} />
                </TouchableOpacity>

                <PatientInfo>
                    <PatientPhoto size={23 * vw} />
                    <PatientNameEditView>
                        <PatientName>{user.name}</PatientName>

                        <PatientEditView onPress={() => navigate('EditProfile')}>
                            <Icon name="edit" size={4 * vw} color={mainTheme.colors.purple} />
                            <PatientEditText>Editar perfil</PatientEditText>
                        </PatientEditView>
                    </PatientNameEditView>
                </PatientInfo>

                <ProfileOption onPress={() => navigate('EditProfile')}>
                    <ProfileOptionText>Dados pessoais</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <LogoutButton onPress={signOut}>
                    <LogoutText>Desconectar</LogoutText>
                    <Icon name="log-out" size={4 * vw} color={mainTheme.colors.gold} />
                </LogoutButton>
            </Container>

            <BottomBar />
        </>
    );
};

export default Profile;
