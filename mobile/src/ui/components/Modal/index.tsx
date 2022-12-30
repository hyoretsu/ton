import { vh } from '@units/viewport';
import { ReactNode } from 'react';

import Button from '@components/Button';

import { Container } from './styles';

interface ModalProps {
    buttonText?: string;
    children: ReactNode;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ buttonText = 'Entendi', children, onConfirm }) => {
    return (
        <Container>
            {children}

            <Button onPress={onConfirm} style={{ marginTop: 1 * vh }}>
                {buttonText}
            </Button>
        </Container>
    );
};

export default Modal;
