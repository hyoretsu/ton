import { createStackNavigator } from '@react-navigation/stack';
import mainTheme from '@theme';
import Appointments from 'screens/Appointments';
import Chat, { ChatParams } from 'screens/Chat';
import Checkup from 'screens/Checkup';
import CheckupCamera from 'screens/CheckupCamera';
import CheckupConfirm, { CheckupConfirmParams } from 'screens/CheckupConfirm';
import CheckupInstructions, { CheckupInstructionsParams } from 'screens/CheckupInstructions';
import Diary from 'screens/Diary';
import EditProfile from 'screens/EditProfile';
import Educational from 'screens/Educational';
import Home from 'screens/Home';
import Profile from 'screens/Profile';

import { InfoProvider } from '@context/info';

export type RootStackParamList = {
    Appointments: undefined;
    Chat?: ChatParams;
    Checkup: undefined;
    CheckupCamera: undefined;
    CheckupConfirm: CheckupConfirmParams;
    CheckupInstructions: CheckupInstructionsParams;
    Diary: undefined;
    EditProfile: undefined;
    Educational: undefined;
    Home: undefined;
    Profile: undefined;
};

const App = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
    return (
        <InfoProvider>
            <App.Navigator
                initialRouteName="Home"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: mainTheme.colors.background,
                    },
                    headerShown: false,
                }}
            >
                <App.Screen name="Appointments" component={Appointments} />
                <App.Screen name="Chat" component={Chat} />
                <App.Screen name="Checkup" component={Checkup} />
                <App.Screen name="CheckupCamera" component={CheckupCamera} />
                <App.Screen name="CheckupConfirm" component={CheckupConfirm} />
                <App.Screen name="CheckupInstructions" component={CheckupInstructions} />
                <App.Screen name="Diary" component={Diary} />
                <App.Screen name="EditProfile" component={EditProfile} />
                <App.Screen name="Educational" component={Educational} />
                <App.Screen name="Home" component={Home} />
                <App.Screen name="Profile" component={Profile} />
            </App.Navigator>
        </InfoProvider>
    );
};

export default AppRoutes;
