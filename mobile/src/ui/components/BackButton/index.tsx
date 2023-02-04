import { useNavigation } from '@react-navigation/native';
import { vw } from '@units/viewport';
import { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Button, Icon } from './styles';

interface BackButtonProps extends TouchableOpacityProps {
    size: number;
}

const BackButton: React.FC<BackButtonProps> = ({ size, style }) => {
    const { goBack } = useNavigation();

    return (
        <Button style={style}>
            <TouchableOpacity onPress={goBack} containerStyle={{ borderRadius: 50 * vw }}>
                <Icon name="chevron-left" size={size} />
            </TouchableOpacity>
        </Button>
    );
};

export default BackButton;
