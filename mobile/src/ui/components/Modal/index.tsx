import { ReactNode } from 'react';

import Button from '@components/Button';

import { Container, ModalText } from './styles';

interface ModalProps {
    buttonText?: string;
    children: ReactNode;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ buttonText = 'Entendi', children, onConfirm }) => {
    return (
        <Container>
            <ModalText>{children}</ModalText>

            <Button onPress={onConfirm}>{buttonText}</Button>
        </Container>
    );
};

export default Modal;
