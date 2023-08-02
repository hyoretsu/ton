import { createStackNavigator } from '@react-navigation/stack';
import Appointments from 'screens/Appointments';
import Chat, { ChatParams } from 'screens/Chat';
import Checkup from 'screens/Checkup';
import CheckupCamera from 'screens/CheckupCamera';
import CheckupConfirm, { CheckupConfirmParams } from 'screens/CheckupConfirm';
import CheckupInstructions from 'screens/CheckupInstructions';
import Diary from 'screens/Diary';
import EditProfile from 'screens/EditProfile';
import Educational from 'screens/Educational';
import HealthProfile from 'screens/HealthProfile';
import History from 'screens/History';
import Home from 'screens/Home';
import PersonalData from 'screens/PersonalData';
import Profile from 'screens/Profile';
import Treatment from 'screens/Treatment';

import { InfoProvider } from '@context/info';

import mainTheme from '@theme';

export type RootStackParamList = {
    Appointments: undefined;
    Chat?: ChatParams;
    Checkup: undefined;
    CheckupCamera: undefined;
    CheckupConfirm: CheckupConfirmParams;
    CheckupInstructions: undefined;
    Diary: undefined;
    EditProfile: undefined;
    Educational: undefined;
    HealthProfile: undefined;
    History: undefined;
    Home: undefined;
    Profile: undefined;
    PersonalData: undefined;
    Treatment: undefined;
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
                <App.Screen name="HealthProfile" component={HealthProfile} />
                <App.Screen name="History" component={History} />
                <App.Screen name="Home" component={Home} />
                <App.Screen name="Profile" component={Profile} />
                <App.Screen name="PersonalData" component={PersonalData} />
                <App.Screen name="Treatment" component={Treatment} />
            </App.Navigator>
        </InfoProvider>
    );
};

export default AppRoutes;
