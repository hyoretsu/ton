import { router } from 'expo-router';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { vw } from '@utils';

import { Button, Icon } from './styles';

interface BackButtonProps extends TouchableOpacityProps {
    size: number;
}

const BackButton: React.FC<BackButtonProps> = ({ size, style }) => {
    return (
        <Button style={style}>
            <TouchableOpacity onPress={router.back} containerStyle={{ borderRadius: 50 * vw }}>
                <Icon name="chevron-left" size={size} />
            </TouchableOpacity>
        </Button>
    );
};

export default BackButton;
