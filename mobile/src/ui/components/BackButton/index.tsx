import { useNavigation } from '@react-navigation/native';
import { TouchableOpacityProps } from 'react-native';

import { Button, Icon } from './styles';

interface BackButtonProps extends TouchableOpacityProps {
    size: number;
}

const BackButton: React.FC<BackButtonProps> = ({ size, style }) => {
    const { goBack } = useNavigation();

    return (
        <Button onPress={goBack} style={style}>
            <Icon name="arrow-left" size={size} />
        </Button>
    );
};

export default BackButton;
