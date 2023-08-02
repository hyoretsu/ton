import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
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
import mainTheme from '@theme';
import { vw } from '@units/viewport';

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

                <ProfileOption onPress={() => navigate('PersonalData')}>
                    <ProfileOptionText>Dados pessoais</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <ProfileOption onPress={() => navigate('HealthProfile')}>
                    <ProfileOptionText>Perfil de saúde</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <ProfileOption onPress={() => navigate('Treatment')}>
                    <ProfileOptionText>Tratamento</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <LogoutButton onPress={() => navigate('History')}>
                        <LogoutText>Histórico</LogoutText>
                        <Icon name="clock" size={4 * vw} color={mainTheme.colors.gold} />
                    </LogoutButton>

                    <LogoutButton onPress={signOut}>
                        <LogoutText>Desconectar</LogoutText>
                        <Icon name="log-out" size={4 * vw} color={mainTheme.colors.gold} />
                    </LogoutButton>
                </View>
            </Container>

            <BottomBar />
        </>
    );
};

export default Profile;
