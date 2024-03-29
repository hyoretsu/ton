import { createStackNavigator } from '@react-navigation/stack';
import SignIn from 'screens/SignIn';

import mainTheme from '@theme';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Auth.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: mainTheme.colors.background,
                },
                headerShown: false,
            }}
        >
            <Auth.Screen name="SignIn" component={SignIn} />
        </Auth.Navigator>
    );
};

export default AuthRoutes;
