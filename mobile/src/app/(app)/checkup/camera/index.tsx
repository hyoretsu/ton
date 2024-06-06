import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet } from 'react-native';

import { CaptureButton, Guideline, Interface } from './styles';

export default function CheckupCamera() {
    const [permission, requestPermission] = useCameraPermissions();
    const camera = useRef<CameraView>(null);

    useEffect(() => {
        const execute = async (): Promise<void> => {
            if (!permission?.granted) {
                const permissionAsked = await requestPermission();

                if (!permissionAsked.granted) {
                    Linking.openSettings();
                }
            }
        };

        execute();
    }, [permission?.granted, requestPermission]);

    const takePhoto = async (): Promise<void> => {
        const photo = await camera.current?.takePictureAsync();

        console.log(photo);

        router.push(`/checkup/confirm?filePath=${photo?.uri}`);
    };

    if (!permission) {
        return (
            <ActivityIndicator
                size={80}
                color="#889ae8"
                style={{
                    position: 'absolute',
                    left: Dimensions.get('window').width * 0.5 - 40,
                    top: Dimensions.get('window').height * 0.5 - 40,
                }}
            />
        );
    }

    return (
        <>
            <StatusBar hidden />

            <CameraView ref={camera} facing="back" flash="on" animateShutter={false} style={StyleSheet.absoluteFill} />

            <Interface>
                <Guideline />
                <CaptureButton onPress={takePhoto} />
            </Interface>
        </>
    );
}
