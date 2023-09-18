/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ObjectiveNotification } from 'backend';
import { differenceInDays, differenceInMinutes, isSameDay } from 'date-fns';
import * as BackgroundFetch from 'expo-background-fetch';
import * as FileSystem from 'expo-file-system';
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
import { CheckupHistory, StorageProvider } from '@context/storage';

import api from '@api';

import mainTheme from '@theme';

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

// Daily checkup sender
TaskManager.defineTask('checkup-send', async ({ data, error, executionInfo }) => {
    const storedSentCheckups = await AsyncStorage.getItem('@ton:sentCheckups');
    let sentCheckups: boolean[] = [];

    if (storedSentCheckups) {
        sentCheckups = JSON.parse(storedSentCheckups);
    }

    const unsentCheckups: number[] = [];

    sentCheckups.forEach((sent, index) => {
        if (!sent) {
            unsentCheckups.push(index);
        }
    });

    if (unsentCheckups.length === 0) {
        return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    const storedCheckupHistory = await AsyncStorage.getItem('@ton:checkupHistory');
    let checkupHistory: CheckupHistory[] = [];

    if (storedCheckupHistory) {
        checkupHistory = JSON.parse(storedCheckupHistory);
    }

    const { data: checkups } = await api.get('/checkup');

    unsentCheckupsLoop: for (const index of unsentCheckups) {
        const savedCheckup = checkupHistory[index];
        const savedCheckupDate = new Date(savedCheckup.date);

        // Check if it was a mistake and the checkup's already been sent
        for (const checkup of checkups) {
            const checkupDate = new Date(checkup.createdAt);

            // If we passed the savedCheckup's date, it definitely wasn't sent
            if (differenceInDays(savedCheckupDate, checkupDate) < 0) {
                break;
            }

            if (
                isSameDay(savedCheckupDate, checkupDate) &&
                Math.abs(differenceInMinutes(savedCheckupDate, checkupDate)) <= 1
            ) {
                sentCheckups[index] = true;
                break;
            }
        }

        if (sentCheckups[index]) {
            continue;
        }

        const formData = new FormData();

        const checkup = checkupHistory[index];

        for (const [key, uri] of Object.entries(checkup.photos)) {
            try {
                const fileInfo = await FileSystem.getInfoAsync(uri);

                if (!fileInfo.exists) {
                    continue unsentCheckupsLoop;
                }
            } catch {
                continue unsentCheckupsLoop;
            }

            formData.append(key, {
                uri,
                type: 'image/jpeg',
                // @ts-ignore
                name: uri.match(/(?:Camera|checkup_photos)\/(.*\.jpg)/)[1],
            });
        }

        formData.append('answers', JSON.stringify(checkup.answers));
        formData.append('createdAt', checkup.date);

        await api.post('/checkup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 120000,
        });

        sentCheckups[index] = true;
    }

    await AsyncStorage.setItem('@ton:sentCheckups', JSON.stringify(sentCheckups));

    return BackgroundFetch.BackgroundFetchResult.NewData;
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

            // Register daily unsent checkups check
            await BackgroundFetch.registerTaskAsync('checkup-send', {
                minimumInterval: 24 * 60 * 60, // 24h in seconds
                stopOnTerminate: false,
                startOnBoot: true,
            });

            // Register daily educational content check
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
