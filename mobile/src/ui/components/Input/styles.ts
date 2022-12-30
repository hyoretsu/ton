import { TextInput } from 'react-native';
import styled from 'rn-css';

interface ContainerProps {
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    align-items: center;

    position: relative;

    width: 100%;
    height: 6vh;

    border: 2px ${({ isErrored, theme }) => (isErrored ? '#f00' : theme.colors.purple)};
    border-radius: 50vw;
    padding: 1vh 5vw;
    margin-bottom: 2vh;
`;

export const CustomInput = styled(TextInput)`
    flex: 1;

    color: ${({ theme }) => theme.colors.purple};
    font-size: 16px;

    border-left: 1px solid ${({ theme }) => theme.colors.purple};
    padding: -1vh 0;
    padding-left: 16px;
`;
