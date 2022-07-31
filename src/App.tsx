import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Routes from './routes';

const App: React.FC = () => {
 LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
 ]);

 return (
  <NavigationContainer>
   <StatusBar barStyle="light-content" backgroundColor="#8295f2" />
   <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#8295f2' }}>
    <Routes />
   </GestureHandlerRootView>
  </NavigationContainer>
 );
};

export default App;
