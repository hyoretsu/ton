import { createStackNavigator } from '@react-navigation/stack';
import Appointments from 'screens/Appointments';
import Chat, { ChatParams } from 'screens/Chat';
import CheckupBegin from 'screens/CheckupBegin';
import CheckupCamera from 'screens/CheckupCamera';
import CheckupConfirm, { CheckupConfirmParams } from 'screens/CheckupConfirm';
import CheckupInstructions from 'screens/CheckupInstructions';
import Diary from 'screens/Diary';
import EditProfile from 'screens/EditProfile';
import Educational from 'screens/Educational';
import Personal from 'screens/Personal';
import Symptoms from 'screens/Symptoms';

export type RootStackParamList = {
    Appointments: undefined;
    Chat?: ChatParams;
    CheckupBegin: undefined;
    CheckupCamera: undefined;
    CheckupConfirm: CheckupConfirmParams;
    CheckupInstructions: undefined;
    Diary: undefined;
    EditProfile: undefined;
    Educational: undefined;
    Personal: undefined;
    Symptoms: undefined;
};

const App = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
    return (
        <App.Navigator
            initialRouteName="Diary"
            screenOptions={{ cardStyle: { backgroundColor: '#c4d3f2' }, headerShown: false }}
        >
            <App.Screen name="Appointments" component={Appointments} />
            <App.Screen name="Chat" component={Chat} />
            <App.Screen name="CheckupBegin" component={CheckupBegin} />
            <App.Screen name="CheckupCamera" component={CheckupCamera} />
            <App.Screen name="CheckupConfirm" component={CheckupConfirm} />
            <App.Screen name="CheckupInstructions" component={CheckupInstructions} />
            <App.Screen name="Diary" component={Diary} />
            <App.Screen name="EditProfile" component={EditProfile} />
            <App.Screen name="Educational" component={Educational} />
            <App.Screen name="Personal" component={Personal} />
            <App.Screen name="Symptoms" component={Symptoms} />
        </App.Navigator>
    );
};

export default AppRoutes;
