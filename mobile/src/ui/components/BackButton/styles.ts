import { Feather as FeatherIcon } from '@expo/vector-icons';
import styled from 'rn-css';

export const Button = styled.View`
    background-color: #fff;
    border-radius: 50vw;
`;

export const Icon = styled(FeatherIcon)`
    color: ${({ theme }) => theme.colors.purple};

    margin: 0 0.5vw 0 -0.5vw;
`;
