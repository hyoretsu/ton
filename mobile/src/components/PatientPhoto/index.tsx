import { Feather as Icon } from '@expo/vector-icons';
import { GestureResponderEvent, Image, StyleProp, ViewStyle } from 'react-native';

import { useAuth } from '@context/auth';
import { vw } from '@utils';

import mainTheme from '@theme';

import { PatientPhotoCircle } from './styles';

interface PatientPhotoProps {
    background?: string;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: (e?: GestureResponderEvent) => void;
    size: number;
    style?: StyleProp<ViewStyle>;
}

const PatientPhoto: React.FC<PatientPhotoProps> = ({
    background = mainTheme.colors.purple,
    onPress,
    size,
    style,
    containerStyle = style,
}) => {
    const { user } = useAuth();

    const defaultIconColor = '#fff';

    return (
        <PatientPhotoCircle
            containerStyle={containerStyle}
            onPress={onPress}
            style={[{ backgroundColor: background }, style]}
        >
            {user.avatarUrl ? (
                <Image
                    source={{ uri: user.avatarUrl }}
                    style={{ borderRadius: 50 * vw, height: '90%', width: '90%' }}
                />
            ) : (
                <Icon name="user" size={size} color={background === defaultIconColor ? '#000' : '#fff'} />
            )}
        </PatientPhotoCircle>
    );
};

export default PatientPhoto;
