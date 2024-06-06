import { Redirect, Slot } from 'expo-router';
import { Text } from 'react-native';

import { useAuth } from '@context/auth';
import { InfoProvider } from '@context/info';

export default function AppLayout() {
    const { loading, user } = useAuth();

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (!user) {
        return <Redirect href="/sign-in" />;
    }

    return (
        <InfoProvider>
            <Slot />
        </InfoProvider>
    );
}
