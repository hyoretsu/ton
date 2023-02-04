import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'rn-css';

export const Button = styled.View`
    background-color: #fff;
    border-radius: 50vw;
`;

export const Icon = styled(FeatherIcon)`
    color: ${({ theme }) => theme.colors.purple};
`;
