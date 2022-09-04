import { StorageProvider } from '@contexts/storage';
import notifee, { AndroidStyle } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { StatusBar } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import contents from 'assets/messages.json';

import Routes from './routes';

const App: React.FC = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);

  useEffect(() => {
    notifee.requestPermission();

    BackgroundFetch.configure(
      {
        // Android
        enableHeadless: true,
        // minimumFetchInterval: 24 * 60,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        startOnBoot: true,
        stopOnTerminate: false,
      },
      async taskId => {
        // get new content and execute if there are new ones

        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Padrão',
        });

        notifee.displayNotification({
          title: 'Há um novo conteudo educacional disponível!',
          body: Object.keys(contents)[0],
          android: {
            channelId,
            pressAction: { id: 'default' },
            style: {
              type: AndroidStyle.BIGTEXT,
              text: Object.keys(contents)[0],
            },
          },
        });

        BackgroundFetch.finish(taskId);
      },
      taskId => BackgroundFetch.finish(taskId),
    );
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#8295f2" />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#8295f2' }}>
        <StorageProvider>
          <Routes />
        </StorageProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
