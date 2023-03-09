import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as Linking from 'expo-linking';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet } from 'react-native';

import { CaptureButton, Guideline, Interface } from '@styles/CheckupCamera';

const CheckupCamera: React.FC = () => {
    const { navigate } = useNavigation();

    const [permission, requestPermission] = Camera.useCameraPermissions();
    const camera = useRef<Camera>(null);

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

        navigate('CheckupConfirm', { filePath: photo?.uri });
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

            <Camera
                ref={camera}
                ratio="16:9"
                // orientation="portrait"
                focusDepth={1}
                flashMode={FlashMode.on}
                type={CameraType.back}
                style={StyleSheet.absoluteFill}
            />

            <Interface>
                <Guideline />
                <CaptureButton onPress={takePhoto} />
            </Interface>
        </>
    );
};

export default CheckupCamera;
