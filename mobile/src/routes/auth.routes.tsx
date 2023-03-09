import { createStackNavigator } from '@react-navigation/stack';
import mainTheme from '@theme';
import SignIn from 'screens/SignIn';

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
