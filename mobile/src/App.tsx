/* eslint-disable global-require */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import mainTheme from '@theme';
import * as BackgroundFetch from 'expo-background-fetch';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'rn-css';

import { AuthProvider } from '@context/auth';
import { StorageProvider } from '@context/storage';

import api from '@api';

import Routes from './routes';

SplashScreen.preventAutoHideAsync();

TaskManager.defineTask('educational-check', async ({ data, error, executionInfo }) => {
    const storedContents = (await AsyncStorage.getItem('@ton:contents')) as string;
    const { data: contents } = await api.get('/contents');

    if (contents.length - JSON.parse(storedContents || "['']").length) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Há um novo conteudo educacional disponível!',
                body: contents[contents.length - 1].title,
                data: {
                    educationalContent: true,
                },
            },
            trigger: null,
        });

        return BackgroundFetch.BackgroundFetchResult.NewData;
    }

    return BackgroundFetch.BackgroundFetchResult.NoData;
});

Notifications.addNotificationResponseReceivedListener(response => {
    const { data, title } = response.notification.request.content;

    if (data.content) {
        Linking.openURL(`ton://Contents?content=${title}`);
    }
});

const App: React.FC = () => {
    // Load custom fonts
    const [fontsLoaded] = useFonts({
        'CeraCompactPro-Bold': require('./assets/fonts/CeraCompactPro-Bold.ttf'),
        'CeraCompactPro-Medium': require('./assets/fonts/CeraCompactPro-Medium.ttf'),
        'CeraCompactPro-Regular': require('./assets/fonts/CeraCompactPro-Regular.ttf'),
    });

    useEffect(() => {
        const execute = async (): Promise<void> => {
            // Create notification channel
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('educational', {
                    name: 'Conteúdo educacional',
                    importance: Notifications.AndroidImportance.HIGH,
                });
            }

            // Get permissions
            const { status: permission } = await Notifications.getPermissionsAsync();
            if (permission !== 'granted') {
                const { status: requestedPermission } = await Notifications.requestPermissionsAsync();
                if (requestedPermission !== 'granted') {
                    Linking.openSettings();
                }
            }

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Há um novo conteudo educacional disponível!',
                    body: 'Apresentação Ton',
                    data: {
                        educationalContent: true,
                    },
                },
                trigger: null,
            });

            await BackgroundFetch.registerTaskAsync('educational-check', {
                minimumInterval: 24 * 60 * 60, // 24h
                stopOnTerminate: false,
                startOnBoot: true,
            });
        };

        execute();
    }, []);

    if (!fontsLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync();
    }

    return (
        <NavigationContainer
            linking={{
                prefixes: [Linking.createURL('/')],
                subscribe(listener) {
                    // Listen to incoming links from deep linking
                    const emitter = Linking.addEventListener('url', ({ url }) => listener(url));

                    // Listen to expo push notifications
                    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                        if (response.notification.request.content.data.educationalContent || false) {
                            listener('Educational');
                        }
                    });

                    return () => {
                        emitter.remove();
                        subscription.remove();
                    };
                },
            }}
        >
            <StatusBar barStyle="dark-content" backgroundColor={mainTheme.colors.background} />
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: mainTheme.colors.background }}>
                <StorageProvider>
                    <AuthProvider>
                        <ThemeProvider theme={mainTheme}>
                            <Routes />
                        </ThemeProvider>
                    </AuthProvider>
                </StorageProvider>
            </GestureHandlerRootView>
        </NavigationContainer>
    );
};

export default App;
