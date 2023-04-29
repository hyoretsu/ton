/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import mainTheme from '@theme';
import { ObjectiveNotification } from 'backend';
import * as BackgroundFetch from 'expo-background-fetch';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect } from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'rn-css';

import { AuthProvider } from '@context/auth';
import { StorageProvider } from '@context/storage';

import api from '@api';

import Routes from './routes';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Educational content check task
TaskManager.defineTask('educational-check', async ({ data, error, executionInfo }) => {
    const storedContents = (await AsyncStorage.getItem('@ton:contents')) as string;
    const { data: contents } = await api.get('/contents');

    if (contents.length - JSON.parse(storedContents || "['']").length) {
        const {
            firstMessage: { body },
        } = contents[contents.length - 1];

        await Notifications.scheduleNotificationAsync({
            content: {
                body,
                data: {
                    url: `ton://Chat?content=${body}`,
                },
            },
            trigger: null,
        });

        return BackgroundFetch.BackgroundFetchResult.NewData;
    }

    return BackgroundFetch.BackgroundFetchResult.NoData;
});

// Objective notifications schedule task
TaskManager.defineTask('notification-schedule', async ({ data, error, executionInfo }) => {
    const user = await AsyncStorage.getItem('@ton:user');
    if (!user) return;

    const { data: notifications } = await api.get<ObjectiveNotification[]>(
        `/objectives/notifications?patientId=${JSON.parse(user).id}`,
    );

    await Notifications.cancelAllScheduledNotificationsAsync();
    notifications.map(async notification => {
        notification.time = new Date(notification.time);

        const date = new Date();
        date.setHours(notification.time.getHours());
        date.setMinutes(notification.time.getMinutes());

        await Notifications.scheduleNotificationAsync({
            content: {
                body: notification.objective.title,
                title: 'Está na hora!',
                data: {
                    url: 'ton://Diary',
                },
            },
            ...(notification.objective.isDaily
                ? {
                      trigger: {
                          hour: notification.time.getHours(),
                          minute: notification.time.getMinutes(),
                          repeats: true,
                      },
                  }
                : {
                      trigger: { date },
                  }),
        });
    });

    return BackgroundFetch.BackgroundFetchResult.NewData;
});

const App: React.FC = () => {
    // Load custom fonts
    const [fontsLoaded, fontsError] = useFonts({
        'CeraCompactPro-Bold': 'https://hyoretsu-fonts.s3.amazonaws.com/Cera+Compact+Pro+(Bold).ttf',
        'CeraCompactPro-Medium': 'https://hyoretsu-fonts.s3.amazonaws.com/Cera+Compact+Pro+(Medium).ttf',
        'CeraCompactPro-Regular': 'https://hyoretsu-fonts.s3.amazonaws.com/Cera+Compact+Pro+(Regular).ttf',
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

            // Register weekly educational content check
            await BackgroundFetch.registerTaskAsync('educational-check', {
                minimumInterval: 24 * 60 * 60, // 24h in seconds
                stopOnTerminate: false,
                startOnBoot: true,
            });

            // Register daily objective notification check
            await BackgroundFetch.registerTaskAsync('notification-schedule', {
                minimumInterval: 24 * 60 * 60, // 24h in seconds
                stopOnTerminate: false,
                startOnBoot: true,
            });
        };

        execute();
    }, []);

    if (fontsError) {
        return (
            <>
                <Text>Fonts</Text>
                <Text>{fontsError?.name}</Text>
                <Text>{fontsError?.message}</Text>
            </>
        );
    } else if (!fontsLoaded) {
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
                        listener(response.notification.request.content.data.url);
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
