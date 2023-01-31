import { vh, vw } from '@units/viewport';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import mainTheme from 'ui/theme/main';

import Button from '@components/Button';

import MinLogo from 'assets/minLogo.svg';

import { Container, ModalInfo, ModalText, ModalTitle } from './styles';

interface ModalProps {
    buttonText?: string;
    children: string;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ buttonText = 'Entendi', children, onConfirm }) => {
    return (
        <Container>
            <TouchableOpacity onPress={onConfirm} containerStyle={{ alignSelf: 'flex-end', borderRadius: 50 * vw }}>
                <Icon name="x-circle" size={9 * vw} color={mainTheme.colors.purple} />
            </TouchableOpacity>

            <ModalInfo>
                <MinLogo height={5 * vh} width={15 * vw} style={{ marginTop: 3 * vh }} />
                <ModalTitle>TON</ModalTitle>
            </ModalInfo>

            <ModalText>{children}</ModalText>

            <Button onPress={onConfirm} paddingHorizontal={7 * vw} paddingVertical={0.8 * vh}>
                {buttonText}
            </Button>
        </Container>
    );
};

export default Modal;
