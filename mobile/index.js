import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App.tsx';

AppRegistry.registerComponent(appName, () => App);

notifee.onBackgroundEvent(async ({ type, detail }) => {});
