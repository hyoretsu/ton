import { createStackNavigator } from '@react-navigation/stack';
import Chat, { ChatParams } from 'screens/Chat';
import CheckupBegin from 'screens/CheckupBegin';
import CheckupCamera from 'screens/CheckupCamera';
import CheckupConfirm, { CheckupConfirmParams } from 'screens/CheckupConfirm';
import CheckupInstructions from 'screens/CheckupInstructions';
import Diary from 'screens/Diary';
import Educational from 'screens/Educational';
import Profile from 'screens/Profile';
import SignIn from 'screens/SignIn';
import Symptoms from 'screens/Symptoms';

export type RootStackParamList = {
  Chat?: ChatParams;
  CheckupBegin: undefined;
  CheckupCamera: undefined;
  CheckupConfirm: CheckupConfirmParams;
  CheckupInstructions: undefined;
  Diary: undefined;
  Educational: undefined;
  Profile: undefined;
  SignIn: undefined;
  Symptoms: undefined;
};

const App = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => (
  <App.Navigator
    initialRouteName="SignIn"
    // initialRouteName="Diary"
    screenOptions={{ cardStyle: { backgroundColor: '#c4d3f2' }, headerShown: false }}
  >
    <App.Screen name="Chat" component={Chat} />
    <App.Screen name="CheckupBegin" component={CheckupBegin} />
    <App.Screen name="CheckupCamera" component={CheckupCamera} />
    <App.Screen name="CheckupConfirm" component={CheckupConfirm} />
    <App.Screen name="CheckupInstructions" component={CheckupInstructions} />
    <App.Screen name="Diary" component={Diary} />
    <App.Screen name="Educational" component={Educational} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="SignIn" component={SignIn} />
    <App.Screen name="Symptoms" component={Symptoms} />
  </App.Navigator>
);

export default Routes;
