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
    height: 7vh;

    border: 2px ${({ isErrored, theme }) => (isErrored ? '#f00' : theme.colors.purple)};
    padding: 1vh 5vw;
    margin-bottom: 2vh;
`;

export const CustomInput = styled(TextInput)`
    flex: 1;

    color: ${({ theme }) => theme.colors.purple};
    font-size: 16px;

    border-left-width: 1px;
    border-left-color: ${({ theme }) => theme.colors.purple};
    padding: -1vh 0;
    padding-left: 4vw;
`;
