import { vw } from '@units/viewport';
import { GestureResponderEvent, Image, StyleProp } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import mainTheme from 'ui/theme/main';

import { useAuth } from '@contexts/auth';

import { PatientPhotoCircle } from './styles';

interface PatientPhotoProps {
    background?: string;
    onPress?: (e: GestureResponderEvent) => void;
    size: number;
    style?: StyleProp<TouchableOpacity>;
}

const PatientPhoto: React.FC<PatientPhotoProps> = ({ background = mainTheme.colors.purple, onPress, size, style }) => {
    const { user } = useAuth();

    const defaultIconColor = '#fff';

    return (
        <PatientPhotoCircle onPress={onPress} style={[{ backgroundColor: background }, style]}>
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
