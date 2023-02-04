import { vh, vw } from '@units/viewport';
import { ReactNode } from 'react';
import { StyleProp, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import mainTheme from 'ui/theme/main';

import Button from '@components/Button';

import MinLogo from 'assets/minLogo.svg';

import { Container, ModalInfo, ModalText, ModalTitle } from './styles';

export interface ModalProps {
    buttonBackground?: string;
    buttonBold?: boolean;
    buttonText?: string;
    buttonTextColor?: string;
    children: string | ReactNode;
    icon?: boolean;
    onConfirm: () => void;
    style?: StyleProp<ViewProps>;
    width?: number;
}

const Modal: React.FC<ModalProps> = ({
    buttonBackground = '',
    buttonBold = false,
    buttonText = 'Entendi',
    buttonTextColor = '',
    children,
    icon = true,
    onConfirm,
    style,
    width = 67,
}) => {
    return (
        <Container style={[{ width: width * vw }, style]}>
            <TouchableOpacity onPress={onConfirm} containerStyle={{ alignSelf: 'flex-end', borderRadius: 50 * vw }}>
                <Icon name="x-circle" size={9 * vw} color={mainTheme.colors.purple} />
            </TouchableOpacity>

            {icon && (
                <ModalInfo>
                    <MinLogo height={5 * vh} width={15 * vw} style={{ marginTop: 3 * vh }} />
                    <ModalTitle>TON</ModalTitle>
                </ModalInfo>
            )}

            {typeof children === 'string' ? <ModalText>{children}</ModalText> : children}

            <Button
                bold={buttonBold}
                onPress={onConfirm}
                color={buttonTextColor}
                background={buttonBackground}
                padding={[0.8 * vh, 7 * vw]}
            >
                {buttonText}
            </Button>
        </Container>
    );
};

export default Modal;
