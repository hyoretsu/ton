import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    GestureResponderEvent,
    Linking,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import FocusCircle from '@components/FocusCircle';

import { CaptureButton, Guideline, Interface } from '@styles/CheckupCamera';

const CheckupCamera: React.FC = () => {
    const { navigate } = useNavigation();

    const [coords, setCoords] = useState<number[]>();
    const camera = useRef<Camera>(null);

    useEffect(() => {
        Camera.getCameraPermissionStatus().then(cameraPermission => {
            if (cameraPermission !== 'authorized') {
                Camera.requestCameraPermission().then(cameraRequest => {
                    if (cameraRequest !== 'authorized') {
                        Linking.openSettings();
                    }
                });
            }
        });
    }, []);

    const focus = (e: GestureResponderEvent): void => {
        const { locationX: x, locationY: y } = e.nativeEvent;

        camera.current?.focus({ x, y });
        setCoords([x, y]);
    };

    const takePhoto = async (): Promise<void> => {
        const photo = await camera.current?.takePhoto({
            flash: 'on',
        });

        navigate('CheckupConfirm', { filePath: photo?.path });
    };

    const device = useCameraDevices().back;

    if (device === undefined) {
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
            <Camera
                ref={camera}
                device={device}
                photo
                orientation="portrait"
                enableZoomGesture
                style={StyleSheet.absoluteFill}
                isActive
            />
            <TouchableWithoutFeedback onPress={focus}>
                <Interface>
                    {coords && (
                        <FocusCircle
                            size={60}
                            style={{ position: 'absolute', left: coords[0] - 35, top: coords[1] - 35 }}
                        />
                    )}

                    <Guideline />
                    <CaptureButton onPress={takePhoto} />
                </Interface>
            </TouchableWithoutFeedback>
        </>
    );
};

export default CheckupCamera;
