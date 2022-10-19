import { createStackNavigator } from '@react-navigation/stack';
import SignIn from 'screens/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Auth.Navigator screenOptions={{ cardStyle: { backgroundColor: '#c4d3f2' }, headerShown: false }}>
            <Auth.Screen name="SignIn" component={SignIn} />
        </Auth.Navigator>
    );
};

export default AuthRoutes;
