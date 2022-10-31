import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@contexts/auth';

import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0006" />
            </View>
        );
    }

    return <AppRoutes />;
};

export default Routes;
