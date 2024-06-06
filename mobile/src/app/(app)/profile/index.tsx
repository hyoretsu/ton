import { Feather as Icon } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import BottomBar from '@components/BottomBar';
import PatientPhoto from '@components/PatientPhoto';
import { useAuth } from '@context/auth';
import { vw } from '@utils';

import mainTheme from '@theme';

import { PatientName } from '../styles';
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
} from './styles';

export default function Profile() {
    const { signOut, user } = useAuth();

    return (
        <>
            <StatusBar backgroundColor="#fff" />

            <Container>
                <TouchableOpacity
                    onPress={router.back}
                    containerStyle={{ alignSelf: 'flex-end', borderRadius: 50 * vw }}
                >
                    <Icon name="x-circle" size={10 * vw} color={mainTheme.colors.purple} />
                </TouchableOpacity>

                <PatientInfo>
                    <PatientPhoto size={23 * vw} />
                    <PatientNameEditView>
                        <PatientName>{user.name}</PatientName>

                        <PatientEditView onPress={() => router.push('/profile/edit')}>
                            <Icon name="edit" size={4 * vw} color={mainTheme.colors.purple} />
                            <PatientEditText>Editar perfil</PatientEditText>
                        </PatientEditView>
                    </PatientNameEditView>
                </PatientInfo>

                <ProfileOption onPress={() => router.push('/personal-data')}>
                    <ProfileOptionText>Dados pessoais</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <ProfileOption onPress={() => router.push('/health-profile')}>
                    <ProfileOptionText>Perfil de saúde</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <ProfileOption onPress={() => router.push('/treatment')}>
                    <ProfileOptionText>Tratamento</ProfileOptionText>

                    <Icon name="chevron-right" size={8 * vw} color={mainTheme.colors.purple} />
                </ProfileOption>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <LogoutButton onPress={() => router.push('/history')}>
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
}
